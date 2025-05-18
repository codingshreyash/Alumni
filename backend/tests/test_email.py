from app.utils import generate_test_email, send_email
from app.core.config import settings

def test_send_email():
    # Test email recipient
    test_email = "braydennguyen8@gmail.com"
    
    # Generate test email content
    email_data = generate_test_email(email_to=test_email)
    
    # Send the email
    try:
        send_email(
            email_to=test_email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )
        print(f"Test email sent successfully to {test_email}")
    except Exception as e:
        print(f"Failed to send email: {str(e)}")

if __name__ == "__main__":
    # Check if email settings are configured
    if not settings.emails_enabled:
        print("Email settings are not configured. Please check your .env file for:")
        print("- SMTP_HOST")
        print("- SMTP_PORT")
        print("- SMTP_USER")
        print("- SMTP_PASSWORD")
        print("- EMAILS_FROM_EMAIL")
        print("- EMAILS_FROM_NAME")
    else:
        test_send_email() 