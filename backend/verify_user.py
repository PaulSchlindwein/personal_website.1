#!/usr/bin/env python3
"""
Script to manually verify users for testing purposes.
Use this when email is not configured.
"""

from app import create_app, db
from models import User

def verify_user(username):
    app = create_app()
    
    with app.app_context():
        user = User.query.filter_by(username=username).first()
        
        if not user:
            print(f"User '{username}' not found!")
            return
        
        if user.is_verified and user.is_approved:
            print(f"User '{username}' is already verified and approved!")
            return
        
        # Verify and approve the user
        user.is_verified = True
        user.is_approved = True
        
        try:
            db.session.commit()
            print(f"User '{username}' verified and approved successfully!")
            print(f"Email: {user.email}")
            print(f"Name: {user.first_name} {user.last_name}")
        except Exception as e:
            print(f"Error updating user: {e}")
            db.session.rollback()

def list_users():
    app = create_app()
    
    with app.app_context():
        users = User.query.all()
        
        if not users:
            print("No users found!")
            return
        
        print("\nAll Users:")
        print("-" * 50)
        for user in users:
            status = []
            if user.is_verified:
                status.append("Verified")
            if user.is_approved:
                status.append("Approved")
            if user.is_admin:
                status.append("Admin")
            
            status_str = ", ".join(status) if status else "Pending"
            
            print(f"Username: {user.username}")
            print(f"Email: {user.email}")
            print(f"Name: {user.first_name} {user.last_name}")
            print(f"Status: {status_str}")
            print("-" * 50)

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python verify_user.py list                    # List all users")
        print("  python verify_user.py verify <username>       # Verify a user")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "list":
        list_users()
    elif command == "verify":
        if len(sys.argv) < 3:
            print("Please provide a username to verify")
            sys.exit(1)
        username = sys.argv[2]
        verify_user(username)
    else:
        print("Unknown command. Use 'list' or 'verify'") 