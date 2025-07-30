#!/usr/bin/env python3
"""
Haim Yafim's Vault Terminal - Flask Application
Entry point for running the Flask web application
"""

import os
from app import create_app

# Create Flask application
app = create_app(os.environ.get('FLASK_ENV', 'development'))

if __name__ == '__main__':
    # Development server
    app.run(
        host='0.0.0.0',  # Allow external connections
        port=int(os.environ.get('PORT', 5000)),
        debug=app.config.get('DEBUG', False)
    ) 