from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate
import json

UserModel = get_user_model()


def info_validation(data):

    print(data,type(data))


    json_data = data.get('_content', None)

    if not json_data:
        raise ValidationError("No json data found in request")
    
    try:
        json_dict = json.loads(json_data)
    except json.JSONDecodeError:
        raise ValidationError("Invalid json data")

    # email = data["email"].strip()
    # email = data.get('email', None)
    # username = data.get('username', None)
    # password = data.get('password', None)
    # username = data['username'].strip()
    # password = data['password'].strip()

    email = json_dict.get('email', None)
    username = json_dict.get('username', None)
    password = json_dict.get('password', None)


    if UserModel.objects.filter(email=email).exists():
        raise ValidationError("This email already exists. Please try a different email.")
    if not email:
        raise ValidationError("Email is required")
    if not password:
        raise ValidationError("Password is required")
    if not username:
        raise ValidationError("Username is required")
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long")
    if len(username) < 5:
        raise ValidationError("Username must be at least 5 characters long")
    return data

def email_validation(data):
    email = data["email"].strip()
    if not email:
        raise ValidationError("Email is required")
    return True

def username_validation(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError("Username is required")
    return True

def password_validation(data):

    password = data['password'].strip()
    if not password:
        raise ValidationError("Password is required")
    return True
