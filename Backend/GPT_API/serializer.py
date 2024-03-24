from rest_framework import serializers
from API.serializers import UserSerializer
from GPT_API.models import Courses

class CoursesSerializer(serializers.ModelSerializer):

    user = UserSerializer(many=True, read_only=True)
    

    class Meta:
        course_id  = serializers.PrimaryKeyRelatedField(many=True, queryset=Courses.objects.all())
        model = Courses
        fields = ['course_name', 'course_difficulty', 'course_duration', 'course_skills','course_image' ,'course_summary', 'course_details','user']


