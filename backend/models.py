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


# Customer Data Models
class Customer(db.Model):
    __tablename__ = 'customers'
    
    customer_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(200))
    device_type = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    touchpoints = db.relationship('Touchpoint', backref='customer', lazy=True)
    interactions = db.relationship('Interaction', backref='customer', lazy=True)
    sales_metrics = db.relationship('SalesMetric', backref='customer', lazy=True)
    financial_metrics = db.relationship('FinancialMetric', backref='customer', lazy=True)
    
    def __repr__(self):
        return f'<Customer {self.first_name} {self.last_name}>'


class Campaign(db.Model):
    __tablename__ = 'campaigns'
    
    campaign_id = db.Column(db.Integer, primary_key=True)
    campaign_name = db.Column(db.String(200))
    utm_source = db.Column(db.String(100))
    utm_medium = db.Column(db.String(100))
    utm_campaign = db.Column(db.String(100))
    ad_keyword = db.Column(db.String(200))
    creative_asset = db.Column(db.String(200))
    start_date = db.Column(db.DateTime)
    ad_spend = db.Column(db.Float)
    
    # Relationships
    interactions = db.relationship('Interaction', backref='campaign', lazy=True)
    sales_metrics = db.relationship('SalesMetric', backref='campaign', lazy=True)
    financial_metrics = db.relationship('FinancialMetric', backref='campaign', lazy=True)
    
    def __repr__(self):
        return f'<Campaign {self.campaign_name}>'


class Touchpoint(db.Model):
    __tablename__ = 'touchpoints'
    
    touchpoint_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    touchpoint_type = db.Column(db.String(100))
    touchpoint_detail = db.Column(db.String(200))
    interaction_date = db.Column(db.DateTime)
    device_type = db.Column(db.String(50))
    
    # Relationships
    interactions = db.relationship('Interaction', backref='touchpoint', lazy=True)
    
    def __repr__(self):
        return f'<Touchpoint {self.touchpoint_type}>'


class Interaction(db.Model):
    __tablename__ = 'interactions'
    
    interaction_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.campaign_id'), nullable=False)
    touchpoint_id = db.Column(db.Integer, db.ForeignKey('touchpoints.touchpoint_id'), nullable=False)
    interaction_type = db.Column(db.String(100))
    interaction_value = db.Column(db.Integer)
    interaction_date = db.Column(db.DateTime)
    
    def __repr__(self):
        return f'<Interaction {self.interaction_type}>'


class SalesMetric(db.Model):
    __tablename__ = 'sales_metrics'
    
    sale_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.campaign_id'), nullable=False)
    conversion_stage = db.Column(db.String(100))
    deal_size = db.Column(db.Float)
    sale_date = db.Column(db.DateTime)
    won = db.Column(db.Integer)  # 1 for won, 0 for lost
    
    def __repr__(self):
        return f'<SalesMetric {self.conversion_stage}>'


class FinancialMetric(db.Model):
    __tablename__ = 'financial_metrics'
    
    financial_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.campaign_id'), nullable=False)
    revenue = db.Column(db.Float)
    cac = db.Column(db.Float)  # Customer Acquisition Cost
    cltv = db.Column(db.Float)  # Customer Lifetime Value
    cpc = db.Column(db.Float)   # Cost Per Click
    cpcv = db.Column(db.Float)  # Cost Per Conversion
    acv = db.Column(db.Float)   # Average Contract Value
    
    def __repr__(self):
        return f'<FinancialMetric {self.revenue}>' 