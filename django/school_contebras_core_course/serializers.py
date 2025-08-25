from rest_framework import serializers
from .models import Lesson, Subject, Teacher,Student, Course, Classroom

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "name", "description"]

class TeacherSerializer(serializers.ModelSerializer):
    # Se quiser incluir as disciplinas como lista de nomes:
    teaching_subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = ["id","username", "name","surname", "email","phone", "teaching_subjects", "hire_date"]

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    # Aqui aninhamos o Subject para já vir junto
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Lesson
        fields = [
            "id",
            "name",
            "day",
            "start_time",
            "end_time",
            "subject",
            "class_ref",
            "teacher",
        ]