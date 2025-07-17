#!/usr/bin/env python3
"""
Simple test script to test the registration endpoint
"""

import requests
import json

def test_registration():
    url = "http://localhost:5000/api/register"
    
    data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123",
        "first_name": "Test",
        "last_name": "User"
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            print("✅ Registration successful!")
        else:
            print("❌ Registration failed!")
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure the backend is running.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_registration() 