from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet,TeacherViewSet ,StudentViewSet, ClassroomViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'students', StudentViewSet)
router.register(r'classrooms', ClassroomViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
