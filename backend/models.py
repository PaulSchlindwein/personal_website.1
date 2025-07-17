from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import bcrypt
import secrets

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    is_approved = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Email verification
    email_verification_token = db.Column(db.String(100), unique=True)
    email_verification_expires = db.Column(db.DateTime)
    
    def set_password(self, password):
        """Hash and set the password"""
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        """Check if the provided password matches the hash"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def generate_email_verification_token(self):
        """Generate a token for email verification"""
        self.email_verification_token = secrets.token_urlsafe(32)
        self.email_verification_expires = datetime.utcnow() + timedelta(hours=24)
        return self.email_verification_token
    
    def verify_email_token(self, token):
        """Verify the email verification token"""
        if (self.email_verification_token == token and 
            self.email_verification_expires > datetime.utcnow()):
            self.is_verified = True
            self.email_verification_token = None
            self.email_verification_expires = None
            return True
        return False
    
    def __repr__(self):
        return f'<User {self.username}>' 