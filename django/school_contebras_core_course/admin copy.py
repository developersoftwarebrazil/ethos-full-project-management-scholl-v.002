from datetime import time
from django import forms
from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import (
    SchoolAdmin, Course, Grade, Teacher, Subject, Classroom, Student,
    RegistrationClassroom, Lesson, Exam, Assignment,
    ExamResult, AssignmentResult, Attendance, Event, Announcement
)

User = get_user_model()
# ========================
# SchoolAdmin
# ========================

@admin.register(SchoolAdmin)
class SchoolAdminAdmin(admin.ModelAdmin):
    list_display = ("id", "get_username", "get_name", "get_email", "created_at")
    search_fields = ("user__username", "user__first_name", "user__last_name", "user__email")

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = "Username"

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    get_name.short_description = "Nome"

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = "Email"
# ========================
# Teacher Form
# ========================
class TeacherForm(forms.ModelForm):
    descrption = forms.CharField(max_length=255, required=False, label="Descrição")
    phone = forms.CharField(max_length=20, required=False, label="Telefone")
    address = forms.CharField(max_length=255, required=False, label="Endereço")
    img = forms.ImageField(required=False, label="Foto")

    class Meta:
        model = Teacher
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Pega o user associado, se existir
        user = getattr(self.instance, 'user', None)
        if user:
            self.fields["descrption"].initial = user.description
            self.fields["phone"].initial = user.phone
            self.fields["address"].initial = user.address
            self.fields["img"].initial = user.img

    def save(self, commit=True):
        teacher = super().save(commit=False)

        # Cria um user automaticamente se não existir
        if not teacher.user:
            teacher.user = User.objects.create(
                username=f'teacher_{int(time.time())}'
            )

        # Atualiza os campos do user
        teacher.user.description = self.cleaned_data.get("descrption")
        teacher.user.phone = self.cleaned_data.get("phone")
        teacher.user.address = self.cleaned_data.get("address")
        teacher.user.img = self.cleaned_data.get("img")
        teacher.user.save()

        if commit:
            teacher.save()

        return teacher

# ========================
# Teacher Admin
# ========================
@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    form = TeacherForm
    
    list_display = (
        "id",
        "get_username",
        "get_name",
        "get_email",
        "get_phone",
        "sex",
        "bloodType",
        "birthday",
        "hire_date",
    )

    filter_horizontal = ("subjects",)

    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "user__email",
        "user__phone",
    )
     
    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = "Username"

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    get_name.short_description = "Nome"

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = "Email"

    def get_phone(self, obj):
        return obj.user.phone
    get_phone.short_description = "Telefone"

# ========================
# Student
# ========================
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "get_username", "get_name", "get_email", "sex", "bloodType", "birthday", "classroom", "grade")
    search_fields = ("user__username", "user__first_name", "user__last_name", "user__email")

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = "Username"

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    get_name.short_description = "Nome"

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = "Email"

# ========================
# Classes
# ========================
@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "grade", "course", "get_supervisor", "get_teachers")
    search_fields = ("name", "course__titleCourse", "grade__name")
    list_filter = ("course", "grade")
    filter_horizontal = ("teachers",)  # permite escolher múltiplos professores com interface amigável

    def get_supervisor(self, obj):
        return f"{obj.supervisor.user.first_name} {obj.supervisor.user.last_name}" if obj.supervisor else "-"
    get_supervisor.short_description = "Supervisor"

    def get_teachers(self, obj):
        return ", ".join([f"{t.user.first_name} {t.user.last_name}" for t in obj.teachers.all()])
    get_teachers.short_description = "Professores"

# ========================
# Registros simples
# ========================
admin.site.register(Course)
admin.site.register(Grade)
admin.site.register(Subject)
admin.site.register(RegistrationClassroom)
admin.site.register(Lesson)
admin.site.register(Exam)
admin.site.register(Assignment)
admin.site.register(ExamResult)
admin.site.register(AssignmentResult)
admin.site.register(Attendance)
admin.site.register(Event)
admin.site.register(Announcement)
