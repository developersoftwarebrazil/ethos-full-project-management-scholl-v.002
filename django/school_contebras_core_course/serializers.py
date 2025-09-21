from rest_framework import serializers
from .models import Lesson, Subject, Teacher, Student, Course, Classroom
from school_contebras_core_accounts.models import User, Role


# ===============================
# User
# ===============================
class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()
    subjects = serializers.SerializerMethodField()
    description = serializers.CharField(required=False, allow_blank=True) 
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "roles",
            "description",  # 👈 adicionado
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
    user = UserSerializer(read_only=True)# apenas leitura
    user_id = serializers.PrimaryKeyRelatedField(# usado no POST/PUT
        queryset=User.objects.all(),
        source="user",
        write_only=True,
        required=False,
    )
    supervised_classrooms = ClassroomBasicSerializer(many=True, read_only=True)
    teaching_classrooms = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = [
            "id",
            "user",
            "user_id",
            "hire_date",
            "sex",
            "bloodType",
            "birthday",
            "createdAt",
            "supervised_classrooms",
            "teaching_classrooms",
        ]
        read_only_fields = ["createdAt", "supervised_classrooms", "teaching_classrooms"]

    def get_teaching_classrooms(self, obj):
        classrooms = obj.classrooms.all()
        return ClassroomBasicSerializer(classrooms, many=True).data

    def create(self, validated_data):
        user = validated_data.pop("user")

        # Garantir que a role 'teacher' existe ou criar se não existir
        teacher_role, created = Role.objects.get_or_create(name="teacher")

        # Vincular a role ao usuário se ainda não tiver
        if teacher_role not in user.roles.all():
            user.roles.add(teacher_role)

        # Criar o Teacher vinculado ao User
        teacher = Teacher.objects.create(user=user, **validated_data)
        return teacher

    def update(self, instance, validated_data):
        # Atualiza Teacher
        teacher_fields = ["hire_date", "sex", "bloodType", "birthday"]
        for field in teacher_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])

        # Atualiza User se estiver presente no contexto
        request_data = self.context.get("request").data if self.context.get("request") else {}
        user_data = {k: request_data.get(k) for k in ["username", "email", "first_name", "last_name", "phone", "address", "description"] if k in request_data}

        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()

        instance.save()
        return instance


# ===============================
# Student
# ===============================
class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source="user",
        write_only=True,
        required=False,
    )

    class Meta:
        model = Student
        fields = [
            "id",
            "user",
            "user_id",
            "sex",
            "bloodType",
            "birthday",
            "createdAt",
            "classroom",
            "grade",
        ]
    read_only_fields = ["createdAt"]

    def create(self, validated_data):
        user = validated_data.pop("user")

        # Garantir que a role 'student' exista
        student_role, _ = Role.objects.get_or_create(name="student")
        if student_role not in user.roles.all():
            user.roles.add(student_role)

        return Student.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        # Atualizar apenas os campos do Student
        student_fields = ["sex", "bloodType", "birthday", "classroom", "grade"]
        for field in student_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])

        # Atualizar User se vier no request
        request_data = self.context.get("request").data if self.context.get("request") else {}
        user_data = {k: request_data.get(k) for k in ["username", "email", "first_name", "last_name", "phone", "address"] if k in request_data}

        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()

        instance.save()
        return instance


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
