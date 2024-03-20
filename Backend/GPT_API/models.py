from django.db import models
from API.models import User
from django.contrib.auth import get_user_model

class Courses(models.Model):
    course_id = models.BigAutoField(primary_key=True)
    course_name = models.CharField(max_length=100, unique=True) 
    course_difficulty = models.CharField(max_length=100, default="Beginner")
    course_duration = models.CharField(max_length=100, default="1")
    course_details = models.JSONField(default=dict)
    # user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='courses', null=True, blank=True)
    user = models.ManyToManyField(User, related_name='courses', null=True, blank=True)

    def __repr__(self):
        return f"{self.course_name} - {self.course_difficulty} - {self.course_duration} - {self.course_details} - {self.user}"
    
    def get_users(self):
        return self.user.all()
