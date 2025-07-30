from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email, Length, ValidationError

class ContactForm(FlaskForm):
    """Terminal-style contact form"""
    name = StringField('OPERATIVE NAME', validators=[
        DataRequired(message='> ERROR: Name required for terminal access'),
        Length(min=2, max=100, message='> ERROR: Name must be 2-100 characters')
    ])
    
    email = StringField('COMM FREQUENCY', validators=[
        DataRequired(message='> ERROR: Communication frequency required'),
        Email(message='> ERROR: Invalid frequency format')
    ])
    
    subject = SelectField('TRANSMISSION TYPE', choices=[
        ('general', '> GENERAL INQUIRY'),
        ('project', '> PROJECT COLLABORATION'),
        ('employment', '> EMPLOYMENT OPPORTUNITY'),
        ('technical', '> TECHNICAL DISCUSSION'),
        ('other', '> OTHER TRANSMISSION')
    ], validators=[DataRequired()])
    
    message = TextAreaField('MESSAGE PAYLOAD', validators=[
        DataRequired(message='> ERROR: Message payload cannot be empty'),
        Length(min=10, max=2000, message='> ERROR: Payload must be 10-2000 characters')
    ])
    
    honeypot = StringField('Leave this field empty')  # Spam protection
    
    submit = SubmitField('> TRANSMIT MESSAGE')
    
    def validate_honeypot(self, field):
        """Basic spam protection"""
        if field.data:
            raise ValidationError('> ERROR: Unauthorized access detected')
    
    def validate_message(self, field):
        """Check for spam patterns"""
        spam_patterns = ['http://', 'https://', 'www.', 'viagra', 'casino', 'loan']
        if any(pattern in field.data.lower() for pattern in spam_patterns):
            raise ValidationError('> ERROR: Potential spam detected')

class AdminLoginForm(FlaskForm):
    """Simple admin authentication"""
    access_code = StringField('ACCESS CODE', validators=[
        DataRequired(message='> ERROR: Access code required')
    ])
    submit = SubmitField('> AUTHENTICATE')

 