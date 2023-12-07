from django.urls import path
from . import views

urlpatterns = [
    path('courses/', views.CourseList.as_view()),
    path('create/course', views.CreateCourse.as_view()),
    path('create/schedule', views.CreateSchedule.as_view()),
    path('create/schedulemaker', views.ScheduleMaker.as_view()),
]
