from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import Courses
from .serializer import CoursesSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .validations import info_validation
from .GPT import create_schedule

class CreateSchedule(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self,request):
       
        clean_data = info_validation(request.data)

        gpt_output = create_schedule(clean_data[0], clean_data[1], clean_data[2])

        return Response(gpt_output)
    

class CourseList(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self,request):

        courses = Courses.objects.all()
        serializer = CoursesSerializer(courses, many=True)
        return Response(serializer.data)


    

class CreateCourse(APIView):

    permission_classes = (permissions.IsAuthenticated,)
    

    def post(self,request):
       
    
        clean_data = info_validation(request.data)

        gpt_output = create_schedule(clean_data[0], clean_data[1], clean_data[2])

        serializer = CoursesSerializer(data = {'course_name':gpt_output['course'], 'course_difficulty': gpt_output['difficulty'],
                                    'course_duration': gpt_output['duration'],'course_description': str(gpt_output['description'])})
        
        if serializer.is_valid(raise_exception=True):
            course = serializer.create(serializer.validated_data)
            if course:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        







# Create your views here.
# @csrf_exempt
# def snippet_list(request):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         courses = Courses.objects.all()
#         serializer = CoursesSerializer(courses, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     elif request.method == 'POST':
#         serializer = CoursesSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors,status=400)
    

# @csrf_exempt
# def snippet_detail(request, course_id):
#     """
#     Retrieve, update or delete a code snippet.
#     """
#     try:
#         courses = Courses.objects.get(pk=course_id)
#     except Courses.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         serializer = CoursesSerializer(courses)
#         return JsonResponse(serializer.data)

#     elif request.method == 'PUT':
#         serializer = CoursesSerializer(courses, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors,status=400)

#     elif request.method == 'DELETE':
#         courses.delete()
#         return HttpResponse(status=204)

