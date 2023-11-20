from rest_framework import serializers
from .models import Courses


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        course_id  = serializers.PrimaryKeyRelatedField(many=True, queryset=Courses.objects.all())
        model = Courses
        fields = ['course_name', 'course_difficulty', 'course_duration', 'course_description']



