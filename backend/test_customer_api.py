#!/usr/bin/env python3
"""
Test script for customer data API endpoints
"""

import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def test_customer_api():
    print("Testing Customer Data API Endpoints")
    print("=" * 50)
    
    # Test dashboard stats
    print("\n1. Testing Dashboard Stats:")
    try:
        response = requests.get(f"{BASE_URL}/api/dashboard/stats")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Found {data['total_customers']} customers")
            print(f"   - Total Campaigns: {data['total_campaigns']}")
            print(f"   - Total Revenue: ${data['total_revenue']:,.2f}")
            print(f"   - Total Interactions: {data['total_interactions']:,}")
            print(f"   - Recent Customers: {data['recent_customers']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test customers endpoint
    print("\n2. Testing Customers Endpoint:")
    try:
        response = requests.get(f"{BASE_URL}/api/customers?page=1&per_page=5")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Retrieved {len(data['customers'])} customers")
            print(f"   - Total customers: {data['total']}")
            print(f"   - Total pages: {data['pages']}")
            print(f"   - Current page: {data['current_page']}")
            
            if data['customers']:
                customer = data['customers'][0]
                print(f"   - Sample customer: {customer['first_name']} {customer['last_name']} ({customer['email']})")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test campaigns endpoint
    print("\n3. Testing Campaigns Endpoint:")
    try:
        response = requests.get(f"{BASE_URL}/api/campaigns")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Found {len(data['campaigns'])} campaigns")
            
            if data['campaigns']:
                campaign = data['campaigns'][0]
                print(f"   - Sample campaign: {campaign['campaign_name']} ({campaign['utm_source']})")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test customer details endpoint
    print("\n4. Testing Customer Details Endpoint:")
    try:
        response = requests.get(f"{BASE_URL}/api/customers/1")
        if response.status_code == 200:
            data = response.json()
            customer = data['customer']
            print(f"✅ Success! Retrieved details for {customer['first_name']} {customer['last_name']}")
            print(f"   - Touchpoints: {len(data['touchpoints'])}")
            print(f"   - Sales Metrics: {len(data['sales_metrics'])}")
            print(f"   - Financial Metrics: {len(data['financial_metrics'])}")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    test_customer_api() 