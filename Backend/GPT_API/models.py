from django.db import models
from API.models import User
from django.contrib.auth import get_user_model

class Courses(models.Model):
    course_id = models.BigAutoField(primary_key=True)
    course_name = models.CharField(max_length=100, unique=True) 
    course_difficulty = models.CharField(max_length=100, default="Beginner")
    course_duration = models.CharField(max_length=100, default="1")
    course_skills = models.CharField(max_length=1000, default="No Skills")
    course_image = models.ImageField(upload_to= 'Backend\GPT_API\images', null= True, blank = True)
    course_summary = models.CharField(max_length=10000, default="This is a course")
    course_details = models.JSONField(default=dict)

    def __repr__(self):
        return f"{self.course_name} - {self.course_difficulty} - {self.course_duration} -{self.course_summary} - {self.course_details}"

class UserCourses(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses', null=True, blank=True)
    courses = models.ManyToManyField(Courses, related_name='users', null=True, blank=True)
    completed = models.JSONField('{}',default=dict)
    module_completions = models.JSONField('{}',default=dict)
    def __repr__(self):
        return f"{self.user} - {self.courses} - {self.completed} - {self.module_completions}"
    

    def __str__(self):
        return f"{self.user} - {self.courses} - {self.completed} - {self.module_completions}"
    
    def update_completed(self, course_id):
        self.completed[course_id] = True
        self.save()

    def add_completed(self, course_id):
        if course_id not in self.completed:
            self.completed[course_id] = False
            self.save()
        else:
            pass

    def add_module(self, course_id, days):
        if course_id not in self.module_completions:
            total_modules = [0 for i in range(days)]
            self.module_completions[course_id] = total_modules
            self.save()
        else:
            pass
        
    def update_module(self, course_id, day):
        lst = self.module_completions
        lst[str(course_id)][int(day)-1] = 1
        self.save()
    
    def module_completion_percentage(self, course_id):
        lst = self.module_completions
        ans = (sum(lst[str(course_id)]) / len(lst[str(course_id)])) * 100
        return ans

    
    

    
    
    
