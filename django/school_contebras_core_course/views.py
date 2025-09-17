from django.shortcuts import render

# Create your views here 
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from school_contebras_core_accounts.models import User, Role
from .models import Lesson, Subject, Teacher,Student, Course, Classroom
from .serializers import LessonSerializer, SubjectSerializer, TeacherSerializer,StudentSerializer, CourseSerializer, ClassroomSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['post'], url_path='assign-role')
    def assign_role(self, request, pk=None):
        user = self.get_object()
        role_name = request.data.get("role")
        try:
            role = Role.objects.get(name=role_name)
        except Role.DoesNotExist:
            return Response({"error": "Role not found"}, status=status.HTTP_400_BAD_REQUEST)

        user.roles.add(role)
        user.save()
        return Response(UserSerializer(user).data)
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all().order_by('id')
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
