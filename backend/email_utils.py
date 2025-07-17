from flask import current_app, url_for
from flask_mail import Message
from threading import Thread
from models import db

def send_async_email(app, msg):
    """Send email asynchronously"""
    with app.app_context():
        from app import mail
        mail.send(msg)

def send_email(subject, recipients, body, html=None):
    """Send email with optional HTML content"""
    from app import mail
    msg = Message(subject, recipients=recipients)
    msg.body = body
    if html:
        msg.html = html
    Thread(target=send_async_email, args=(current_app._get_current_object(), msg)).start()

def send_verification_email(user):
    """Send email verification link to user"""
    token = user.generate_email_verification_token()
    db.session.commit()
    
    verification_url = url_for('verify_email', token=token, _external=True)
    
    subject = "Verify Your Email - PSS III Personal Website"
    body = f"""
    Hello {user.first_name},
    
    Thank you for registering with PSS III Personal Website!
    
    Please click the following link to verify your email address:
    {verification_url}
    
    This link will expire in 24 hours.
    
    If you didn't create an account, please ignore this email.
    
    Best regards,
    PSS III Team
    """
    
    html = f"""
    <html>
    <body>
        <h2>Welcome to PSS III Personal Website!</h2>
        <p>Hello {user.first_name},</p>
        <p>Thank you for registering with PSS III Personal Website!</p>
        <p>Please click the button below to verify your email address:</p>
        <a href="{verification_url}" style="background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <p>Best regards,<br>PSS III Team</p>
    </body>
    </html>
    """
    
    send_email(subject, [user.email], body, html)

def send_admin_notification(user):
    """Send notification to admin about new user registration"""
    subject = "New User Registration - PSS III Personal Website"
    body = f"""
    A new user has registered:
    
    Username: {user.username}
    Email: {user.email}
    Name: {user.first_name} {user.last_name}
    Registration Date: {user.created_at.strftime('%Y-%m-%d %H:%M:%S')}
    
    Please review and approve this user account.
    """
    
    admin_email = current_app.config.get('ADMIN_EMAIL', 'admin@example.com')
    send_email(subject, [admin_email], body)

def send_approval_notification(user, approved=True):
    """Send notification to user about account approval/rejection"""
    if approved:
        subject = "Account Approved - PSS III Personal Website"
        body = f"""
        Hello {user.first_name},
        
        Your account has been approved! You can now sign in to your account.
        
        Best regards,
        PSS III Team
        """
    else:
        subject = "Account Status Update - PSS III Personal Website"
        body = f"""
        Hello {user.first_name},
        
        Your account registration is currently under review. We will notify you once a decision has been made.
        
        Best regards,
        PSS III Team
        """
    
    send_email(subject, [user.email], body) 