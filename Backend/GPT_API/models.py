from django.db import models

# Create your models here.

class Courses(models.Model):
    course_id = models.CharField(max_length=100, primary_key=True)
    course_name = models.CharField(max_length=100, unique=True) 
    course_description = models.CharField(max_length=1000)
    def __str__(self):
        return self.course_id
    
