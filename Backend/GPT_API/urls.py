from django.urls import path
from . import views

urlpatterns = [
    path('courses/', views.CourseList.as_view()),
    path('courses/create', views.CreateCourse.as_view()),
]
