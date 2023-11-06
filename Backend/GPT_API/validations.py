
from django.core.exceptions import ValidationError
from .models import Courses




def info_validation(data):

    course_id = data["course_id"].strip()
    course_name = data['course_name'].strip()
    course_description = data['course_description'].strip()

    if Courses.objects.filter(course_id=course_id).exists():
        raise ValidationError("This course_id already exists. Go to the course page to find it.")
    
    if not course_id:
        raise ValidationError("course_id is required")
    if not course_name:
        raise ValidationError("course_name is required")
    if not course_description:
        raise ValidationError("course_description is required")
    
    return data
