# 🚀 Flask Development Setup

## Quick Start Guide

### 1. **Create Virtual Environment**
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment (Windows)
.venv\Scripts\activate

# Activate virtual environment (Linux/Mac)
source .venv/bin/activate
```

### 2. **Install Dependencies**
```bash
pip install -r requirements.txt
```

### 3. **Run the Application**
```bash
# Start Flask development server
python run.py

# Open in browser: http://localhost:5000
```

## 🌐 Available URLs

- **Home**: http://localhost:5000/
- **Contact**: http://localhost:5000/contact
- **Admin**: http://localhost:5000/admin (password: `vault101`)
- **API Status**: http://localhost:5000/api/status
- **API Stats**: http://localhost:5000/api/stats
- **API Mantra**: http://localhost:5000/api/mantra

## 🔧 Configuration

### Email Setup (Optional)
To enable contact form emails, create a `.env` file:
```
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
ADMIN_EMAIL=haim.yafim@example.com
```

### Admin Access
- Default admin code: `vault101`
- Change this in `app/routes.py` for production!
- Access admin panel at: `http://localhost:5000/admin`

## 🌐 URLs

- **Home**: http://localhost:5000/
- **Contact**: http://localhost:5000/contact
- **Admin**: http://localhost:5000/admin
- **API Status**: http://localhost:5000/api/status
- **API Stats**: http://localhost:5000/api/stats
- **API Mantra**: http://localhost:5000/api/mantra

## 🐛 Troubleshooting

### Common Issues:

1. **Import Errors**
   ```bash
   # Make sure you're in the right directory
   cd haimyafim-flask-website
   
   # Activate virtual environment
   vault-env\Scripts\activate
   ```

2. **Database Errors**
   ```bash
   # Delete database and recreate
   del vault_terminal.db  # Windows
   rm vault_terminal.db   # Linux/Mac
   
   # Restart the app
   python run.py
   ```

3. **CSS/JS Not Loading**
   - Check that files are in `app/static/` directories
   - Clear browser cache (Ctrl+F5)

4. **Email Not Working**
   - Check SMTP settings in `.env`
   - Use app-specific passwords for Gmail
   - Contact form will still save to database

## 🎮 Testing Features

### Contact Form
1. Go to http://localhost:5000/contact
2. Fill out the form
3. Check database or admin panel for messages

### Admin Panel
1. Go to http://localhost:5000/admin
2. Enter access code: `vault101`
3. View statistics and messages

### APIs
- Test APIs in browser or with curl:
  ```bash
  curl http://localhost:5000/api/status
  curl http://localhost:5000/api/stats
  curl http://localhost:5000/api/mantra
  ```

## 🔐 Security Notes

### For Development:
- Default admin password is `vault101`
- Database is SQLite file
- Debug mode is enabled

### For Production:
- Change admin password in `routes.py`
- Use environment variables for secrets
- Set `FLASK_ENV=production`
- Use proper database (PostgreSQL)
- Configure proper WSGI server (Gunicorn)

## 📊 Database Schema

The app creates these tables automatically:
- `visitor` - Track page visits
- `contact_message` - Store contact form submissions  
- `site_stats` - Overall site statistics
- `system_status` - System status messages

## 🎨 Customization

### Adding Content:
1. **Edit templates** in `app/templates/`
2. **Add styles** in `app/static/css/`
3. **Add routes** in `app/routes.py`

### Theme Changes:
- CSS variables are in `app/static/css/styles.css`
- Change colors in `:root` section
- All effects will adapt automatically

## ✅ Features You Have

### **🔥 Dynamic Features:**
- **Working Contact Form** - Messages saved to database + email notifications
- **Visitor Analytics** - Real-time tracking of page views and unique visitors
- **Admin Dashboard** - Professional management interface
- **API Endpoints** - RESTful APIs for integration
- **Database Storage** - Persistent data storage
- **Security** - CSRF protection, input validation, spam filtering

### **🎨 All Visual Effects:**
- Purple-pink + blue-cyan neon lighting
- Matrix digital rain background
- Fallout terminal interface with Pip-Boy UI
- Vault Boy pixel art character
- Glitch effects and CRT scan lines
- Your personal mantra with typing animation
- Responsive design for all devices

## ✅ Ready for Production?

Once development is working:
1. Follow the deployment guide in `FLASK_DEPLOYMENT_PLAN.md`
2. Set up proper server (Nginx + Gunicorn)
3. Configure SSL certificates
4. Set up monitoring and backups

---

**🎮 Your cyberpunk terminal is ready to deploy to the wasteland!** 