from datetime import datetime
from app import db

class Visitor(db.Model):
    """Track website visitors for analytics"""
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(45), nullable=False)  # Support IPv6
    user_agent = db.Column(db.Text)
    page_visited = db.Column(db.String(200), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    referrer = db.Column(db.String(200))
    
    def __repr__(self):
        return f'<Visitor {self.ip_address} - {self.page_visited}>'

class ContactMessage(db.Model):
    """Store contact form submissions"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    ip_address = db.Column(db.String(45))
    is_read = db.Column(db.Boolean, default=False)
    
    def __repr__(self):
        return f'<ContactMessage from {self.name} - {self.subject}>'

class SiteStats(db.Model):
    """Store general site statistics"""
    id = db.Column(db.Integer, primary_key=True)
    total_visits = db.Column(db.Integer, default=0)
    unique_visitors = db.Column(db.Integer, default=0)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)
    
    @staticmethod
    def get_or_create():
        """Get existing stats or create new record"""
        stats = SiteStats.query.first()
        if not stats:
            stats = SiteStats()
            db.session.add(stats)
            db.session.commit()
        return stats
    
    def update_visit(self, is_unique=False):
        """Update visit counters"""
        self.total_visits += 1
        if is_unique:
            self.unique_visitors += 1
        self.last_updated = datetime.utcnow()
        db.session.commit()

class SystemStatus(db.Model):
    """Track system status and uptime"""
    id = db.Column(db.Integer, primary_key=True)
    status_type = db.Column(db.String(50), nullable=False)  # 'uptime', 'error', 'maintenance'
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<SystemStatus {self.status_type} - {self.timestamp}>' 