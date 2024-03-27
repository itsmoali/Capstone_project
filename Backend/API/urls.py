from django.urls import path, include
from .views import UserView, UserRegistration, UserLogin, UserLogout, UserCourseList, UserStats
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'userstats', UserStats)


urlpatterns = [
    path('signup', UserRegistration.as_view(), name='register'),
    path('login', UserLogin.as_view(), name='login'),
    path('logout', UserLogout.as_view(), name='logout'),
    path('user', UserView.as_view(), name='user'),
    path('usercourselist', UserCourseList.as_view(), name='usercourselist'),
    path('', include(router.urls)),
]