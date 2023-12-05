
from django.core.exceptions import ValidationError
from .models import Courses

# data = {"course":"Piano","difficulty":"Beginner","duration":"10 days"}


def info_validation(data):


    
    course_name = data.get('course', False)
    course_difficulty = data.get('difficulty', False)
    course_duration = data.get('duration', False)
    

    if Courses.objects.filter(course_name=course_name).exists():
        raise ValidationError("This Course already exists. Go to the course page to find it.")
    
    if not course_name:
        raise ValidationError("Course Name is required")
    if not course_duration:
        raise ValidationError("Course Duration is required")
    if not course_difficulty:
        raise ValidationError("Course Difficulty is required")
    
    
    return course_duration, course_name, course_difficulty




def output_validation(data):

    course_name = data.get('course', False)
    course_difficulty = data.get('difficulty', False)
    course_duration = data.get('duration', False)
    course_schedule = data.get('schedule', False)

    if not course_name:
        raise ValidationError("Course Name is required. Please try again")
    if not course_schedule:
        raise ValidationError("Course Schedule is required. Please try again")
    if not course_duration:
        raise ValidationError("Course Duration is required. Please try again")
    if not course_difficulty:
        raise ValidationError("Course Difficulty is required. Please try again")

    return data

