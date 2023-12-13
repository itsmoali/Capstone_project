from django.db import models

# Create your models here.

class Courses(models.Model):
    course_id = models.BigAutoField(primary_key=True)
    course_name = models.CharField(max_length=100, unique=True) 
    course_difficulty = models.CharField(max_length=100, default="Beginner")
    course_duration = models.CharField(max_length=100, default="1")
    course_schedule = models.JSONField(default=dict)

    
    def __repr__(self):
        return f"{self.course_name} - {self.course_difficulty} - {self.course_duration} - {self.course_schedule}"