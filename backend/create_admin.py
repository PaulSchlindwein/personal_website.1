#!/usr/bin/env python3
"""
Script to create an admin user for testing purposes.
Run this script once to create an admin account.
"""

from app import create_app, db
from models import User

def create_admin_user():
    app = create_app()
    
    with app.app_context():
        # Create database tables
        db.create_all()
        
        # Check if admin already exists
        admin = User.query.filter_by(username='admin').first()
        if admin:
            print("Admin user already exists!")
            return
        
        # Create admin user
        admin = User(
            username='admin',
            email='admin@example.com',
            first_name='Admin',
            last_name='User',
            is_verified=True,
            is_approved=True,
            is_admin=True
        )
        admin.set_password('admin123')
        
        try:
            db.session.add(admin)
            db.session.commit()
            print("Admin user created successfully!")
            print("Username: admin")
            print("Password: admin123")
            print("Email: admin@example.com")
        except Exception as e:
            print(f"Error creating admin user: {e}")
            db.session.rollback()

if __name__ == '__main__':
    create_admin_user() 