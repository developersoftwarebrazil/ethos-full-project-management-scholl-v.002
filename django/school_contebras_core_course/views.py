from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Lesson, Subject, Teacher,Student, Course, Classroom
from .serializers import LessonSerializer, SubjectSerializer, TeacherSerializer,StudentSerializer, CourseSerializer, ClassroomSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.select_related("subject", "class_ref", "teacher").all()
    serializer_class = LessonSerializer
