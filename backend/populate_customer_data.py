#!/usr/bin/env python3
"""
Script to populate the database with customer data
"""

import random
from datetime import datetime, timedelta
from app import create_app, db
from models import Customer, Campaign, Touchpoint, Interaction, SalesMetric, FinancialMetric

def populate_customer_data():
    app = create_app()
    
    with app.app_context():
        print("Starting to populate customer data...")
        
        # Clear existing data
        print("Clearing existing data...")
        FinancialMetric.query.delete()
        SalesMetric.query.delete()
        Interaction.query.delete()
        Touchpoint.query.delete()
        Campaign.query.delete()
        Customer.query.delete()
        db.session.commit()
        
        # Create customers
        print("Creating customers...")
        customers = []
        for i in range(1, 1001):
            customer = Customer(
                first_name=f"First{i}",
                last_name=f"Last{i}",
                email=f"user{i}@example.com",
                device_type=random.choice(['Mobile', 'Desktop', 'Tablet']),
                created_at=datetime.utcnow() - timedelta(days=random.randint(0, 365))
            )
            customers.append(customer)
        
        db.session.add_all(customers)
        db.session.commit()
        print(f"Created {len(customers)} customers")
        
        # Create campaigns
        print("Creating campaigns...")
        campaigns = []
        utm_sources = ['Google', 'Meta', 'LinkedIn']
        utm_mediums = ['CPC', 'Display', 'Email']
        
        for i in range(1, 51):
            campaign = Campaign(
                campaign_name=f"Campaign{i}",
                utm_source=random.choice(utm_sources),
                utm_medium=random.choice(utm_mediums),
                utm_campaign=f"Camp{i}",
                ad_keyword=f"keyword{random.randint(1, 50)}",
                creative_asset=f"Creative{random.randint(1, 50)}",
                start_date=datetime.utcnow() - timedelta(days=random.randint(0, 180)),
                ad_spend=1000 + random.randint(0, 10000)
            )
            campaigns.append(campaign)
        
        db.session.add_all(campaigns)
        db.session.commit()
        print(f"Created {len(campaigns)} campaigns")
        
        # Create touchpoints
        print("Creating touchpoints...")
        touchpoint_types = ['Website Visit', 'Ad Click', 'Email Open', 'Social Media', 'Content Download', 'Webinar', 'Form Submission']
        touchpoint_details = ['Page', 'Ad', 'Email', 'Post', 'Whitepaper', 'Webinar', 'Demo Request']
        
        touchpoints = []
        for customer in customers:
            for _ in range(5):  # 5 touchpoints per customer
                touchpoint_type = random.choice(touchpoint_types)
                detail_type = random.choice(touchpoint_details)
                touchpoint = Touchpoint(
                    customer_id=customer.customer_id,
                    touchpoint_type=touchpoint_type,
                    touchpoint_detail=f"{detail_type}{random.randint(1, 10)}",
                    interaction_date=datetime.utcnow() - timedelta(days=random.randint(0, 365)),
                    device_type=random.choice(['Mobile', 'Desktop', 'Tablet'])
                )
                touchpoints.append(touchpoint)
        
        db.session.add_all(touchpoints)
        db.session.commit()
        print(f"Created {len(touchpoints)} touchpoints")
        
        # Create interactions
        print("Creating interactions...")
        interaction_types = ['Click', 'Impression', 'Like', 'Share']
        interactions = []
        
        for touchpoint in touchpoints:
            campaign = random.choice(campaigns)
            interaction = Interaction(
                customer_id=touchpoint.customer_id,
                campaign_id=campaign.campaign_id,
                touchpoint_id=touchpoint.touchpoint_id,
                interaction_type=random.choice(interaction_types),
                interaction_value=random.randint(0, 100),
                interaction_date=touchpoint.interaction_date
            )
            interactions.append(interaction)
        
        db.session.add_all(interactions)
        db.session.commit()
        print(f"Created {len(interactions)} interactions")
        
        # Create sales metrics
        print("Creating sales metrics...")
        conversion_stages = ['Lead', 'Opportunity', 'Negotiation', 'Closed']
        sales_metrics = []
        
        for customer in customers:
            for campaign in campaigns:
                if random.random() < 0.3:  # 30% chance of having sales data
                    sales_metric = SalesMetric(
                        customer_id=customer.customer_id,
                        campaign_id=campaign.campaign_id,
                        conversion_stage=random.choice(conversion_stages),
                        deal_size=1000 + random.randint(0, 50000),
                        sale_date=datetime.utcnow() - timedelta(days=random.randint(0, 365)),
                        won=1 if random.randint(1, 100) <= 30 else 0
                    )
                    sales_metrics.append(sales_metric)
        
        db.session.add_all(sales_metrics)
        db.session.commit()
        print(f"Created {len(sales_metrics)} sales metrics")
        
        # Create financial metrics
        print("Creating financial metrics...")
        financial_metrics = []
        
        for sales_metric in sales_metrics:
            financial_metric = FinancialMetric(
                customer_id=sales_metric.customer_id,
                campaign_id=sales_metric.campaign_id,
                revenue=5000 + random.randint(0, 100000),
                cac=100 + random.randint(0, 1000),
                cltv=10000 + random.randint(0, 50000),
                cpc=0.5 + (random.random() * 10) / 2.0,
                cpcv=10 + random.randint(0, 100),
                acv=5000 + random.randint(0, 20000)
            )
            financial_metrics.append(financial_metric)
        
        db.session.add_all(financial_metrics)
        db.session.commit()
        print(f"Created {len(financial_metrics)} financial metrics")
        
        print("Customer data population completed successfully!")
        print(f"Summary:")
        print(f"- Customers: {len(customers)}")
        print(f"- Campaigns: {len(campaigns)}")
        print(f"- Touchpoints: {len(touchpoints)}")
        print(f"- Interactions: {len(interactions)}")
        print(f"- Sales Metrics: {len(sales_metrics)}")
        print(f"- Financial Metrics: {len(financial_metrics)}")

if __name__ == '__main__':
    populate_customer_data() 