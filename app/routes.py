from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify, current_app
from flask_mail import Message
from app import mail, db
from app.models import Visitor, ContactMessage, SiteStats, SystemStatus
from app.forms import ContactForm, AdminLoginForm
from datetime import datetime, timedelta

# Create blueprint
main = Blueprint('main', __name__)

def track_visitor(page):
    """Track visitor for analytics"""
    try:
        ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
        user_agent = request.headers.get('User-Agent', '')
        referrer = request.headers.get('Referer', '')
        
        # Check if this is a unique visitor (first visit today)
        today = datetime.utcnow().date()
        existing_visitor = Visitor.query.filter(
            Visitor.ip_address == ip,
            Visitor.timestamp >= today
        ).first()
        
        is_unique = existing_visitor is None
        
        # Log the visit
        visitor = Visitor(
            ip_address=ip,
            user_agent=user_agent,
            page_visited=page,
            referrer=referrer
        )
        db.session.add(visitor)
        
        # Update site stats
        stats = SiteStats.get_or_create()
        stats.update_visit(is_unique=is_unique)
        
        db.session.commit()
    except Exception as e:
        # Don't let analytics break the site
        print(f"Analytics error: {e}")
        pass

@main.route('/')
def index():
    """Home page with terminal interface"""
    track_visitor('home')
    
    # Get latest system status
    status = SystemStatus.query.filter_by(status_type='operational').order_by(
        SystemStatus.timestamp.desc()
    ).first()
    
    return render_template('index.html', system_status=status)

@main.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact form page"""
    track_visitor('contact')
    form = ContactForm()
    
    if form.validate_on_submit():
        try:
            # Save to database
            contact_msg = ContactMessage(
                name=form.name.data,
                email=form.email.data,
                subject=form.subject.data,
                message=form.message.data,
                ip_address=request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
            )
            db.session.add(contact_msg)
            db.session.commit()
            
            # Send email notification
            if current_app.config['MAIL_USERNAME']:
                msg = Message(
                    subject=f"[Vault Terminal] {form.subject.data}",
                    recipients=[current_app.config['ADMIN_EMAIL']],
                    body=f"""
> NEW TRANSMISSION RECEIVED

OPERATIVE: {form.name.data}
FREQUENCY: {form.email.data}
TYPE: {form.subject.data}
TIMESTAMP: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')}

MESSAGE PAYLOAD:
{form.message.data}

---
Transmitted via Vault-Tec Terminal System
                    """,
                    sender=current_app.config['MAIL_DEFAULT_SENDER']
                )
                mail.send(msg)
            
            flash('> TRANSMISSION SUCCESSFUL: Message sent to Vault-Tec Command', 'success')
            return redirect(url_for('main.index'))
            
        except Exception as e:
            db.session.rollback()
            flash('> TRANSMISSION FAILED: Please try again', 'error')
    
    return render_template('contact.html', form=form)

@main.route('/admin', methods=['GET', 'POST'])
def admin():
    """Simple admin panel"""
    # Check for admin access (simple password protection)
    admin_code = request.args.get('code') or request.form.get('access_code')
    if admin_code != 'vault101':  # Change this in production!
        form = AdminLoginForm()
        if form.validate_on_submit():
            if form.access_code.data == 'vault101':
                return redirect(url_for('main.admin', code='vault101'))
            flash('> ACCESS DENIED: Invalid access code', 'error')
        return render_template('admin_login.html', form=form)
    
    # Handle admin actions
    action = request.args.get('action')
    message_id = request.args.get('id')
    
    if action and message_id:
        try:
            message = ContactMessage.query.get_or_404(message_id)
            if action == 'mark_read':
                message.is_read = True
                db.session.commit()
                flash('> TRANSMISSION MARKED AS READ', 'success')
                # Redirect back to admin panel to avoid reprocessing on refresh
                return redirect(url_for('main.admin', code='vault101'))
            elif action == 'mark_unread':
                message.is_read = False
                db.session.commit()
                flash('> TRANSMISSION MARKED AS UNREAD', 'success')
                # Redirect back to admin panel to avoid reprocessing on refresh
                return redirect(url_for('main.admin', code='vault101'))
            elif action == 'view':
                # Mark as read when viewing
                if not message.is_read:
                    message.is_read = True
                    db.session.commit()
                
                # Get site statistics for the view
                stats = SiteStats.get_or_create()
                recent_visitors = Visitor.query.order_by(Visitor.timestamp.desc()).limit(20).all()
                messages = ContactMessage.query.order_by(ContactMessage.timestamp.desc()).all()
                
                # Get visitor stats for last 7 days (same as regular admin view)
                week_ago = datetime.utcnow() - timedelta(days=7)
                daily_stats = {}
                for i in range(7):
                    day = week_ago + timedelta(days=i)
                    day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
                    day_end = day_start + timedelta(days=1)
                    
                    count = Visitor.query.filter(
                        Visitor.timestamp >= day_start,
                        Visitor.timestamp < day_end
                    ).count()
                    
                    daily_stats[day.strftime('%Y-%m-%d')] = count
                
                return render_template('admin.html',
                                     stats=stats,
                                     recent_visitors=recent_visitors,
                                     messages=messages,
                                     daily_stats=daily_stats,
                                     view_message=message)  # Pass the message to view
        except Exception as e:
            flash(f'> ERROR: Could not access transmission - {str(e)}', 'error')
            return redirect(url_for('main.admin', code='vault101'))
    
    # Get site statistics
    stats = SiteStats.get_or_create()
    recent_visitors = Visitor.query.order_by(Visitor.timestamp.desc()).limit(20).all()
    messages = ContactMessage.query.order_by(ContactMessage.timestamp.desc()).all()
    
    # Get visitor stats for last 7 days
    week_ago = datetime.utcnow() - timedelta(days=7)
    daily_stats = {}
    for i in range(7):
        day = week_ago + timedelta(days=i)
        day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        
        count = Visitor.query.filter(
            Visitor.timestamp >= day_start,
            Visitor.timestamp < day_end
        ).count()
        
        daily_stats[day.strftime('%Y-%m-%d')] = count
    
    return render_template('admin.html',
                         stats=stats,
                         recent_visitors=recent_visitors,
                         messages=messages,
                         daily_stats=daily_stats,
                         view_message=None)

@main.route('/api/status')
def api_status():
    """API endpoint for system status"""
    stats = SiteStats.get_or_create()
    status = SystemStatus.query.order_by(SystemStatus.timestamp.desc()).first()
    
    return jsonify({
        'status': 'online',
        'timestamp': datetime.utcnow().isoformat(),
        'total_visits': stats.total_visits,
        'unique_visitors': stats.unique_visitors,
        'system_status': status.status_type if status else 'operational',
        'uptime': '99.9%',  # You can calculate real uptime
        'message': '> VAULT-TEC SYSTEMS OPERATIONAL'
    })

@main.route('/api/stats')
def api_stats():
    """API endpoint for site statistics"""
    stats = SiteStats.get_or_create()
    
    # Get recent activity
    recent_visitors = Visitor.query.filter(
        Visitor.timestamp >= datetime.utcnow() - timedelta(hours=24)
    ).count()
    
    return jsonify({
        'total_visits': stats.total_visits,
        'unique_visitors': stats.unique_visitors,
        'visitors_24h': recent_visitors,
        'last_updated': stats.last_updated.isoformat() if stats.last_updated else None
    })

@main.route('/api/mantra')
def api_mantra():
    """API endpoint for inspirational quotes"""
    mantras = [
        "☉Healthy body, Peaceful mind, Happy journey☉",
        "> PERSEVERANCE: The key to unlocking any vault",
        "> CURIOSITY: Fuel for exploration in the wasteland",
        "> CREATIVITY: Building tomorrow from yesterday's ruins",
        "> RESILIENCE: Standing strong against any storm"
    ]
    
    import random
    return jsonify({
        'mantra': random.choice(mantras),
        'timestamp': datetime.utcnow().isoformat()
    })

# Error handlers
@main.app_errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404

@main.app_errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('errors/500.html'), 500 