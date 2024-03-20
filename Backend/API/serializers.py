from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

CustomUserModel = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = '__all__'
    
    def create(self, clean_data):

        user_object = CustomUserModel.objects.create_user(
            email=clean_data['email'],
            password=clean_data['password'],
            username=clean_data['username'],
        )
        user_object.save()
        return user_object

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ['email', 'password']

    email = serializers.EmailField()
    password = serializers.CharField()

    def check_auth(self, clean_data):
        user = authenticate(email = clean_data['email'], password = clean_data['password'])
        if not user:
            raise ValidationError("This email does not exist.")
        return user


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()


    class Meta:
        model = CustomUserModel
        fields = ['email', 'username']

