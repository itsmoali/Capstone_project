from django.shortcuts import render
from rest_framework import generics

from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
from .validations import info_validation, email_validation, username_validation, password_validation
from GPT_API.serializer import CoursesSerializer
from GPT_API.models import Courses
# Create your views here.


# class CustomAuthToken(APIView):
#     permission_classes = (permissions.AllowAny,)
#     def post(self, request):
#         serializer = self.serializer_class(data=request.data,
#                                            context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key,
#             'email': user.email
#         })

class UserRegistration(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = info_validation(request.data)
        serializer = UserRegistrationSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            user_token = Token.objects.create(user=user)
            if user:
                return Response({'user': serializer.data, 'token': str(user_token.key)}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    # authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert email_validation(data)
        assert password_validation(data)
        # assert username_validation(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_auth(data)
            login(request, user)
            user_token = Token.objects.get(user=user)

            return Response({'user':serializer.data,'token':str(user_token)}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
    
    def post(self,request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = UserSerializer(request.user)
        user_token = Token.objects.get(user= request.user)
        return Response({'user': serializer.data,'auth':str(user_token)}, status=status.HTTP_200_OK)



class UserCourseList(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication, SessionAuthentication,)

    def get(self, request):
        current_user = request.user
        user_courses = current_user.courses.all()
        serializer = CoursesSerializer(user_courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        user = request.user
        course = Courses.objects.get(course_name=request.data.get("course_name"))
        course.user.add(user)
        course.save()
        user_courses = user.courses.all()
        serializer = CoursesSerializer(user_courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    # def get(self, request):
    #      current_user = request.user
    #      user_courses = current_user.courses.all()
    #      serializer = CoursesSerializer(user_courses, many=True)
    #      return Response(serializer.data, status=status.HTTP_200_OK)
    
    # def post(self, request):
    #     current_user = request.user 
        # print(current_user)
        # course = Courses.objects.get(course_name=request.data.get("course_name"))
        # current_user.courses.add(course)

        # serializer = UserSerializer(current_user)
        # # user_course = (current_user.courses.add(serializer)).update()
        # return Response(current_user, status=status.HTTP_200_OK)
