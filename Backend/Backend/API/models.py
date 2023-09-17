from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100, unique =True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    def __str__(self):
        return self.username
    
class Courses(models.Model):
    course_id = models.CharField(max_length=100, primary_key=True)
    course_name = models.CharField(max_length=100, unique=True) 
    course_description = models.CharField(max_length=1000)
    def __str__(self):
        return self.course_id
    

class CourseResources(models.Model):
    course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)
    course_resource_id = models.CharField(max_length=100, primary_key=True)
    course_resource_name = models.CharField(max_length=100)
    course_resource_description = models.CharField(max_length=1000)
    course_resource_link = models.CharField(max_length=1000)
    def __str__(self):
        return self.course_resource_id