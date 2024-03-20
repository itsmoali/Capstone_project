from django.urls import path
from .views import UserView, UserRegistration, UserLogin, UserLogout, UserCourseList

urlpatterns = [
    path('signup', UserRegistration.as_view(), name='register'),
    path('login', UserLogin.as_view(), name='login'),
    path('logout', UserLogout.as_view(), name='logout'),
    path('user', UserView.as_view(), name='user'),
    path('usercourselist', UserCourseList.as_view(), name='usercourselist'),
]