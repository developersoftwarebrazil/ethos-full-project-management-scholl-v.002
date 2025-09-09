from rest_framework import serializers
from .models import Lesson, Subject, Teacher, Student, Course, Classroom
from school_contebras_core_accounts.models import User


# ===============================
# User
# ===============================
class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()
    subjects = serializers.SerializerMethodField() 
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "roles",
            "phone",
            "address",
            "img",
            "subjects",
        ]
    def get_roles(self, obj):
        return [role.name for role in obj.roles.all()]

    def get_subjects(self, obj):
        if hasattr(obj, "teacher_profile"):  # se for professor
            return [subject.name for subject in obj.teacher_profile.teaching_subjects.all()]
        return []
    
class ClassroomBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ["id", "name"]


# ===============================
# Teacher
# ===============================
class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    supervised_classrooms = ClassroomBasicSerializer(many=True, read_only=True)  # 👈 aqui
    teaching_classrooms = serializers.SerializerMethodField()  # turmas que ele leciona
    class Meta:
        model = Teacher
        fields = [
            "id",
            "user",
            "hire_date",
            "sex",
            "bloodType",
            "birthday",
            "createdAt",
            "supervised_classrooms",  # 👈 incluído
            "teaching_classrooms",
        ]

    def get_teaching_classrooms(self, obj):
        """
        Retorna todas as turmas em que o professor leciona.
        """
        # pega todas as turmas onde ele é professor (ManyToManyField em Classroom)
        classrooms = obj.classrooms.all()  # relacao via Classroom.teachers
        return ClassroomBasicSerializer(classrooms, many=True).data
# ===============================
# Student
# ===============================
class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Student
        fields = [
            "id",
            "user",
            "sex",
            "bloodType",
            "birthday",
            "createdAt",
            "classroom",
            "grade",
        ]


# ===============================
# Subject
# ===============================
class SubjectSerializer(serializers.ModelSerializer):
    teachers = TeacherSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = [
            "id",
            "name",
            "description",
            "teachers"
        ]


# ===============================
# Classroom (com supervisor e alunos)
# ===============================
class ClassroomSerializer(serializers.ModelSerializer):
    supervisor = TeacherSerializer(read_only=True)
    students = StudentSerializer(many=True, read_only=True)

    class Meta:
        model = Classroom
        fields = [
            "id",
            "name",
            "grade",
            "supervisor",
            "students"
        ]


# ===============================
# Lesson
# ===============================
class LessonSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    class_ref = ClassroomSerializer(read_only=True)
    teacher = TeacherSerializer(read_only=True)

    class Meta:
        model = Lesson
        fields = "__all__"


# ===============================
# Course COMPLETO
# ===============================
class CourseSerializer(serializers.ModelSerializer):
    classrooms = ClassroomSerializer(many=True, read_only=True)
    
    # Todas as disciplinas que fazem parte das turmas deste curso
    subjects = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "titleCourse",
            "description",
            "classrooms",
            "subjects",
        ]

    def get_subjects(self, obj):
        """
        Retorna todas as disciplinas relacionadas às turmas do curso,
        com professores que lecionam cada disciplina.
        """
        # Pega todas as turmas do curso
        classrooms = obj.classrooms.all()
        # Pega todas as disciplinas dessas turmas
        subject_ids = set()
        for classroom in classrooms:
            for lesson in classroom.lessons.all():
                subject_ids.add(lesson.subject.id)

        subjects = Subject.objects.filter(id__in=subject_ids).distinct()
        return SubjectSerializer(subjects, many=True, read_only=True).data
