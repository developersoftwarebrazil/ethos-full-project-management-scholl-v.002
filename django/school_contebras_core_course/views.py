from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Student, Course, Classroom
from .serializers import StudentSerializer, CourseSerializer, ClassroomSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
