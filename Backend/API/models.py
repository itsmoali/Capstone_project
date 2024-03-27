from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager


# Custom User Manager. Necessary for authentication by email instead of username

class AppUserManager(BaseUserManager):

    def create_user(self, email,username,password=None):

        if not email:
            raise ValueError("Email is required")
        if not password:
            raise ValueError("Password is required")
        if not username:
            raise ValueError("Username is required")
        
        user = self.model(email = self.normalize_email(email), username=username)

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,email,password, username=None):
 
        if not email:
            raise ValueError("Email is required")
        if not password:
            raise ValueError("Password is required")

        user = self.create_user(email,password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

# Custom User Model. Necessary for authentication by email instead of username

class User(AbstractBaseUser, PermissionsMixin):

    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'    
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    def __str__(self):
        return self.username
