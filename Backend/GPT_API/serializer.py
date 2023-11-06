from rest_framework import serializers
from .models import Courses


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ('course_id', 'course_name', 'course_description')


# class CourseResourcesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CourseResources
#         fields = ('course_id', 'course_resource_id', 'course_resource_name', 'course_resource_description', 'course_resource_link')



