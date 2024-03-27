from django.shortcuts import render
from rest_framework import generics
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
from .validations import info_validation, email_validation, username_validation, password_validation
from GPT_API.serializer import CoursesSerializer, UserCoursesSerializer
from GPT_API.models import Courses, UserCourses
from .models import User
# Create your views here.

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
    authentication_classes = (SessionAuthentication,)

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
        user_courses = UserCourses.objects.filter(user = request.user)
        if not user_courses:
            obj = UserCourses.objects.create(user=request.user)
            serializer = UserCoursesSerializer(obj)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = UserCoursesSerializer(user_courses, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    
    def post(self, request):
        name = request.data.get("course_name")
        course = Courses.objects.get(course_name=name)
        user_course = UserCourses.objects.get(user=request.user)
        user_course.courses.add(course)
        user_course.save()
        user_course.add_completed(course.course_id)
        user_course.add_module(course.course_id, len(course.course_details))

        serializer = UserCoursesSerializer(user_course)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserStats(ViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication, TokenAuthentication,)
    queryset = UserCourses.objects.all()


    @action(detail=False, methods=['post'])
    def get_progress(self, request):
        user_course = UserCourses.objects.get(user=request.user)
        course_id = Courses.objects.get(course_name=request.data.get('course_name')).course_id
        progress = user_course.module_completions[str(course_id)]
        return Response({'progress': progress})
        



    @action(detail=False, methods=['post'])
    def update_completed(self, request):
        course_id = Courses.objects.get(course_name=request.data.get('course_name')).course_id
        user_course = UserCourses.objects.get(user=request.user)
        user_course.update_completed(course_id)
        return Response({'message': 'Completed status updated successfully'})
        
    @action(detail=False, methods=['post'])
    def update_module(self, request):
        course_id = Courses.objects.get(course_name=request.data.get('course_name')).course_id
        day = request.data.get('day')
        user_course = UserCourses.objects.get(user=request.user)
        user_course.update_module(course_id, day)
        return Response({'message': 'Module updated successfully'})


    @action(detail=False, methods=['post'])
    def m_percentage(self, request):
        course_id = Courses.objects.get(course_name=request.data.get('course_name')).course_id
        user_course = UserCourses.objects.get(user=request.user)
        completion_percentage = user_course.module_completion_percentage(course_id)
        return Response({'completion_percentage': str(completion_percentage)})

