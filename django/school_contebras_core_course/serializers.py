from rest_framework import serializers
from .models import Lesson, Subject, Teacher, Student, Course, Classroom

# ===============================
# Subject
# ===============================
class SubjectSerializer(serializers.ModelSerializer):
    """Serializer para disciplina (Subject)."""

    class Meta:
        model = Subject
        fields = ["id", "name", "description"]


# ===============================
# Classroom
# ===============================
class ClassroomSerializer(serializers.ModelSerializer):
    """Serializer para sala de aula (Classroom)."""

    class Meta:
        model = Classroom
        fields = ("id", "name", "grade", "course")


# ===============================
# Teacher
# ===============================
class TeacherSerializer(serializers.ModelSerializer):
    """
    Serializer para professor.
    Inclui disciplinas ministradas e turmas supervisionadas.
    """
    teaching_subjects = SubjectSerializer(many=True, read_only=True)
    supervised_classrooms = ClassroomSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = [
            "id",
            "username",
            "name",
            "surname",
            "email",
            "phone",
            "hire_date",
            "teaching_subjects",      # disciplinas que leciona
            "supervised_classrooms",  # turmas supervisionadas
        ]


# ===============================
# Course
# ===============================
class CourseSerializer(serializers.ModelSerializer):
    """Serializer para curso (Course)."""

    class Meta:
        model = Course
        fields = "__all__"


# ===============================
# Student
# ===============================
class StudentSerializer(serializers.ModelSerializer):
    """Serializer para aluno (Student)."""

    class Meta:
        model = Student
        fields = "__all__"


# ===============================
# Lesson
# ===============================
class LessonSerializer(serializers.ModelSerializer):
    """
    Serializer para aula (Lesson).
    Inclui a disciplina (Subject) de forma aninhada.
    """
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
