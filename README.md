# 🎮 Haim Yafim's Cyberpunk Terminal Website

> A Fallout-inspired cyberpunk terminal interface built with Flask, featuring Matrix digital rain, neon lighting effects, and professional web application functionality.

![Terminal Interface](https://img.shields.io/badge/Interface-Terminal-00ff00?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.3+-red?style=for-the-badge&logo=flask)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

## 🌟 **Live Demo**

**Coming Soon**: Will be deployed to Linux server at `your-domain.com`

## ✨ **Features**

### 🎨 **Cyberpunk Visual Effects**
- 💜 **Purple-pink neon lighting** (left wall effect)
- 💙 **Blue-cyan neon lighting** (right wall effect)  
- 🌊 **Matrix digital rain** background animation
- ⚡ **Glitch effects** and CRT scan lines
- 🎯 **Fallout pixel art** (Vault Boy, terminal icons)
- ☉ **Typing mantra animation** (one-time, non-looping)
- 📱 **Fully responsive design** for all devices

### 🚀 **Professional Web Application**
- ✅ **Working Contact Form** - Messages saved to database + email notifications
- ✅ **Admin Dashboard** - Real-time analytics and message management  
- ✅ **Visitor Tracking** - Automatic analytics with unique visitor detection
- ✅ **RESTful APIs** - Status, statistics, and inspirational mantras
- ✅ **Database Storage** - SQLite with professional schema
- ✅ **Security Features** - CSRF protection, spam filtering, input validation

### 🛡️ **Security & Performance**
- CSRF protection on all forms
- Input validation and sanitization
- Spam protection with honeypot fields
- Environment variable management
- Professional error handling (404/500 pages)
- Production-ready configuration

## 🖥️ **Tech Stack**

**Backend:**
- **Python 3.8+** - Core language
- **Flask 2.3** - Web framework
- **SQLAlchemy** - Database ORM
- **WTForms** - Form handling
- **Flask-Mail** - Email functionality

**Frontend:**
- **HTML5** - Semantic markup
- **CSS3** - Advanced animations and effects
- **JavaScript ES6+** - Interactive functionality
- **Jinja2** - Template engine

**Database:**
- **SQLite** (development)
- **PostgreSQL** ready (production)

**Deployment:**
- **Gunicorn** - WSGI server
- **Nginx** - Reverse proxy
- **Let's Encrypt** - SSL certificates
- **Systemd** - Service management

## 🚀 **Quick Start**

### **Prerequisites**
- Python 3.8 or higher
- Git

### **Installation**

```bash
# 1. Clone the repository
git clone https://github.com/HaimW/haimyafim-cyberpunk-terminal.git
cd haimyafim-cyberpunk-terminal

# 2. Create virtual environment
python -m venv vault-env

# 3. Activate virtual environment
# Windows:
vault-env\Scripts\activate
# Linux/Mac:
source vault-env/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Configure environment (copy and edit .env)
copy .env .env.local  # Windows
cp .env .env.local    # Linux/Mac

# 6. Run the application
python run.py
```

### **Access the Application**
- **Home**: http://localhost:5000/
- **Contact Form**: http://localhost:5000/contact
- **Admin Panel**: http://localhost:5000/admin (password: `vault101`)
- **API Status**: http://localhost:5000/api/status

## 📁 **Project Structure**

```
haimyafim-cyberpunk-terminal/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── models.py            # Database models
│   ├── routes.py            # URL routes & views
│   ├── forms.py             # WTForms definitions
│   ├── templates/           # Jinja2 templates
│   │   ├── base.html        # Base template with all effects
│   │   ├── index.html       # Main terminal interface
│   │   ├── contact.html     # Contact form
│   │   ├── admin.html       # Admin dashboard
│   │   └── errors/          # Error pages (404, 500)
│   └── static/              # Static assets
│       ├── css/             # Stylesheets
│       ├── js/              # JavaScript
│       └── images/          # Images
├── config.py                # Configuration management
├── requirements.txt         # Python dependencies
├── run.py                   # Application entry point
├── .env                     # Environment variables template
└── docs/                    # Documentation
```

## 🔧 **Configuration**

### **Environment Variables**

Create a `.env.local` file for your local settings:

```bash
# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your-secret-key-here

# Email Configuration (for contact form)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
ADMIN_EMAIL=haim.yafim@example.com

# Database
DATABASE_URL=sqlite:///vault_terminal.db

# Analytics (optional)
GOOGLE_ANALYTICS_ID=your-ga-id
```

### **Admin Access**
- Default admin code: `vault101`
- **⚠️ Change this in `app/routes.py` for production!**

## 🌐 **API Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/status` | GET | System status and uptime |
| `/api/stats` | GET | Site statistics and analytics |
| `/api/mantra` | GET | Random inspirational mantra |

### **Example API Response**

```json
{
  "status": "online",
  "timestamp": "2025-01-29T22:15:30",
  "total_visits": 1337,
  "unique_visitors": 42,
  "system_status": "operational",
  "uptime": "99.9%",
  "message": "> VAULT-TEC SYSTEMS OPERATIONAL"
}
```

## 🚀 **Deployment**

### **Production Deployment Guide**

Full deployment instructions available in `FLASK_DEPLOYMENT_PLAN.md`

**Quick deployment on Linux:**

```bash
# 1. Server preparation
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv nginx

# 2. Clone and setup
git clone https://github.com/HaimW/haimyafim-cyberpunk-terminal.git
cd haimyafim-cyberpunk-terminal
python3 -m venv vault-env
source vault-env/bin/activate
pip install -r requirements.txt

# 3. Configure production environment
cp .env .env.production
# Edit .env.production with production settings

# 4. Setup Gunicorn and Nginx
# Follow detailed instructions in FLASK_DEPLOYMENT_PLAN.md
```

### **Hosting Costs**
- **Linux Server**: $0 (your existing machine)
- **Domain**: $0-15/year (free options available)
- **SSL Certificate**: $0 (Let's Encrypt)
- **Total**: **FREE to $15/year**

## 🎨 **Customization**

### **Changing Colors**
Edit CSS variables in `app/static/css/styles.css`:

```css
:root {
    --primary-color: #00ff00;    /* Terminal green */
    --bg-color: #1a1a1a;        /* Dark background */
    --accent-color: #ff1493;     /* Change to your preference */
}
```

### **Adding Content**
1. **Edit templates** in `app/templates/`
2. **Add routes** in `app/routes.py`
3. **Add styles** in `app/static/css/`

### **Database Schema**
- `visitor` - Page visit tracking
- `contact_message` - Contact form submissions
- `site_stats` - Overall site statistics
- `system_status` - System status messages

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📸 **Screenshots**

*Coming soon - Will add screenshots once deployed*

## 🎯 **Future Enhancements**

- [ ] Blog system with markdown support
- [ ] Portfolio gallery showcase
- [ ] User authentication system
- [ ] Real-time chat with WebSockets
- [ ] Mobile app API
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Terminal command system expansion

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 **Author**

**Haim Yafim**
- GitHub: [@HaimW](https://github.com/HaimW)
- Website: Coming Soon
- Email: Contact via the terminal interface

## 🙏 **Acknowledgments**

- Inspired by Fallout's Pip-Boy interface
- Matrix digital rain effect inspiration
- Cyberpunk aesthetic influences
- Flask community for excellent documentation

---

**🎮 Welcome to the wasteland! Your terminal awaits...**

> "☉Healthy body, Peaceful mind, Happy journey☉" 