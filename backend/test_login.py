#!/usr/bin/env python3
"""
Simple test script to test the login endpoint
"""

import requests
import json

def test_login():
    url = "http://localhost:5000/api/login"
    
    data = {
        "username": "testuser",
        "password": "password123",
        "remember_me": False
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Login successful!")
        else:
            print("❌ Login failed!")
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure the backend is running.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_login() 