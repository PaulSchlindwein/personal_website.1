#!/usr/bin/env python3
"""
Simple script to view SQLite database contents
"""

from app import create_app, db
from models import User

def view_database():
    app = create_app()
    
    with app.app_context():
        print("=== PSS III Personal Website Database ===")
        print("=" * 50)
        
        # Get all users
        users = User.query.all()
        
        if not users:
            print("No users found in database.")
            return
        
        print(f"Total Users: {len(users)}")
        print()
        
        for i, user in enumerate(users, 1):
            print(f"User #{i}:")
            print(f"  ID: {user.id}")
            print(f"  Username: {user.username}")
            print(f"  Email: {user.email}")
            print(f"  Name: {user.first_name} {user.last_name}")
            print(f"  Verified: {user.is_verified}")
            print(f"  Approved: {user.is_approved}")
            print(f"  Admin: {user.is_admin}")
            print(f"  Created: {user.created_at}")
            print(f"  Last Login: {user.last_login}")
            print("-" * 30)

def view_user_details(username):
    app = create_app()
    
    with app.app_context():
        user = User.query.filter_by(username=username).first()
        
        if not user:
            print(f"User '{username}' not found!")
            return
        
        print(f"=== User Details: {username} ===")
        print(f"ID: {user.id}")
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
        print(f"First Name: {user.first_name}")
        print(f"Last Name: {user.last_name}")
        print(f"Password Hash: {user.password_hash[:20]}...")
        print(f"Verified: {user.is_verified}")
        print(f"Approved: {user.is_approved}")
        print(f"Admin: {user.is_admin}")
        print(f"Created At: {user.created_at}")
        print(f"Last Login: {user.last_login}")
        print(f"Email Token: {user.email_verification_token}")
        print(f"Token Expires: {user.email_verification_expires}")

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "user" and len(sys.argv) > 2:
            view_user_details(sys.argv[2])
        else:
            print("Usage:")
            print("  python view_db.py                    # View all users")
            print("  python view_db.py user <username>    # View specific user")
    else:
        view_database() 