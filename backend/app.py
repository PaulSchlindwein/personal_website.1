from flask import Flask, request, jsonify, render_template, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_mail import Mail
from flask_wtf.csrf import CSRFProtect
from config import Config
from models import db, User
from forms import RegistrationForm, LoginForm
from email_utils import send_verification_email, send_admin_notification, send_approval_notification
import os

# Initialize Flask extensions
login_manager = LoginManager()
mail = Mail()
csrf = CSRFProtect()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    csrf.init_app(app)
    
    # Configure login manager
    login_manager.login_view = 'login'
    login_manager.login_message = 'Please log in to access this page.'
    
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    # CORS configuration
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    
    # API Routes
    @app.route('/api/ping')
    def ping():
        return {'message': 'pong'}
    
    @app.route('/api/register', methods=['POST'])
    def api_register():
        """API endpoint for user registration"""
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already taken'}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create new user
        user = User(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name']
        )
        user.set_password(data['password'])
        
        try:
            db.session.add(user)
            db.session.commit()
            
            # Send verification email
            send_verification_email(user)
            
            # Send admin notification
            send_admin_notification(user)
            
            return jsonify({
                'message': 'Registration successful! Please check your email to verify your account.',
                'user_id': user.id
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'Registration failed. Please try again.'}), 500
    
    @app.route('/api/login', methods=['POST'])
    def api_login():
        """API endpoint for user login"""
        data = request.get_json()
        
        if not data.get('username') or not data.get('password'):
            return jsonify({'error': 'Username and password are required'}), 400
        
        user = User.query.filter_by(username=data['username']).first()
        
        if user and user.check_password(data['password']):
            if not user.is_verified:
                return jsonify({'error': 'Please verify your email before logging in'}), 401
            
            if not user.is_approved:
                return jsonify({'error': 'Your account is pending approval'}), 401
            
            # Update last login
            user.last_login = db.func.now()
            db.session.commit()
            
            login_user(user, remember=data.get('remember_me', False))
            
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'is_admin': user.is_admin
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    
    @app.route('/api/logout', methods=['POST'])
    @login_required
    def api_logout():
        """API endpoint for user logout"""
        logout_user()
        return jsonify({'message': 'Logout successful'}), 200
    
    @app.route('/api/user', methods=['GET'])
    @login_required
    def api_get_user():
        """API endpoint to get current user info"""
        return jsonify({
            'id': current_user.id,
            'username': current_user.username,
            'email': current_user.email,
            'first_name': current_user.first_name,
            'last_name': current_user.last_name,
            'is_admin': current_user.is_admin,
            'is_verified': current_user.is_verified,
            'is_approved': current_user.is_approved
        }), 200
    
    # Web Routes (for email verification)
    @app.route('/verify-email/<token>')
    def verify_email(token):
        """Email verification endpoint"""
        user = User.query.filter_by(email_verification_token=token).first()
        
        if not user:
            return jsonify({'error': 'Invalid verification token'}), 400
        
        if user.email_verification_expires < db.func.now():
            return jsonify({'error': 'Verification token has expired'}), 400
        
        if user.verify_email_token(token):
            db.session.commit()
            return jsonify({'message': 'Email verified successfully! You can now log in.'}), 200
        else:
            return jsonify({'error': 'Verification failed'}), 400
    
    # Admin routes
    @app.route('/api/admin/users', methods=['GET'])
    @login_required
    def api_get_users():
        """API endpoint to get all users (admin only)"""
        if not current_user.is_admin:
            return jsonify({'error': 'Admin access required'}), 403
        
        users = User.query.all()
        return jsonify({
            'users': [{
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_verified': user.is_verified,
                'is_approved': user.is_approved,
                'is_admin': user.is_admin,
                'created_at': user.created_at.isoformat() if user.created_at else None,
                'last_login': user.last_login.isoformat() if user.last_login else None
            } for user in users]
        }), 200
    
    @app.route('/api/admin/users/<int:user_id>/approve', methods=['POST'])
    @login_required
    def api_approve_user(user_id):
        """API endpoint to approve a user (admin only)"""
        if not current_user.is_admin:
            return jsonify({'error': 'Admin access required'}), 403
        
        user = User.query.get_or_404(user_id)
        user.is_approved = True
        db.session.commit()
        
        # Send approval notification
        send_approval_notification(user, approved=True)
        
        return jsonify({'message': f'User {user.username} approved successfully'}), 200
    
    @app.route('/api/admin/users/<int:user_id>/reject', methods=['POST'])
    @login_required
    def api_reject_user(user_id):
        """API endpoint to reject a user (admin only)"""
        if not current_user.is_admin:
            return jsonify({'error': 'Admin access required'}), 403
        
        user = User.query.get_or_404(user_id)
        user.is_approved = False
        db.session.commit()
        
        # Send rejection notification
        send_approval_notification(user, approved=False)
        
        return jsonify({'message': f'User {user.username} rejected'}), 200
    
    return app

# Create the app instance
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
