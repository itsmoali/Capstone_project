from rest_framework import serializers
from API.serializers import UserSerializer
from GPT_API.models import Courses, UserCourses

class CoursesSerializer(serializers.ModelSerializer):
    
    class Meta:
        course_id  = serializers.PrimaryKeyRelatedField(many=True, queryset=Courses.objects.all())
        model = Courses
        fields = ['course_id','course_name', 'course_difficulty', 'course_duration', 'course_skills','course_image' ,'course_summary', 'course_details']


class UserCoursesSerializer(serializers.ModelSerializer):
    courses = CoursesSerializer(many=True)
    class Meta:
        model = UserCourses
        fields = ['user', 'courses', 'completed', 'module_completions']