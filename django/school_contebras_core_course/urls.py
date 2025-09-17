from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, LessonViewSet, SubjectViewSet,TeacherViewSet ,StudentViewSet, ClassroomViewSet, UserViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'students', StudentViewSet)
router.register(r'classrooms', ClassroomViewSet)
router.register(r"subjects", SubjectViewSet)
router.register(r"lessons", LessonViewSet)
router.register(r'users', UserViewSet)  # 👈 nova rota

urlpatterns = [
    path('', include(router.urls)),
]
