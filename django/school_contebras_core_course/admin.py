import time
from django import forms
from django.contrib import admin
from django.contrib.auth import get_user_model

from school_contebras_core_course.models import (
    SchoolAdmin,
    Course,
    Grade,
    Teacher,
    Subject,
    Classroom,
    Student,
    RegistrationClassroom,
    Lesson,
    Exam,
    Assignment,
    ExamResult,
    AssignmentResult,
    Attendance,
    Event,
    Announcement,
)

User = get_user_model()
# ========================
# SchoolAdmin
# ========================
@admin.register(SchoolAdmin)
class SchoolAdminAdmin(admin.ModelAdmin):
    list_display = ("id", "get_username", "get_name", "get_email", "created_at")
    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "user__email",
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

# ========================
# Teacher Form
# ========================
class TeacherForm(forms.ModelForm):
    description = forms.CharField(max_length=255, required=False, label="Descrição")
    phone = forms.CharField(max_length=20, required=False, label="Telefone")
    address = forms.CharField(max_length=255, required=False, label="Endereço")
    img = forms.ImageField(required=False, label="Foto")

    class Meta:
        model = Teacher
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        user = getattr(self.instance, "user", None)
        if user:
            self.fields["description"].initial = user.description
            self.fields["phone"].initial = user.phone
            self.fields["address"].initial = user.address
            self.fields["img"].initial = user.img

    def save(self, commit=True):
        teacher = super().save(commit=False)

        if not teacher.user:
            teacher.user = User.objects.create(username=f"teacher_{int(time.time())}")

        # Atualiza os campos do user
        teacher.user.description = self.cleaned_data.get("description")  # type: ignore
        teacher.user.phone = self.cleaned_data.get("phone")  # type: ignore
        teacher.user.address = self.cleaned_data.get("address")  # type: ignore
        teacher.user.img = self.cleaned_data.get("img")  # type: ignore
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
        "get_sex",
        "get_bloodType",
        "get_birthday",
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

    def get_sex(self, obj):
        return obj.user.get_sex_display() if obj.user.sex else "-"

    get_sex.short_description = "Sexo"

    def get_bloodType(self, obj):
        return obj.user.bloodType or "-"

    get_bloodType.short_description = "Tipo Sanguíneo"

    def get_birthday(self, obj):
        return obj.user.birthday or "-"

    get_birthday.short_description = "Nascimento"

# ========================
# Student
# ========================
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "get_username",
        "get_name",
        "get_email",
        "get_sex",
        "get_bloodType",
        "get_birthday",
        "classroom",
        "grade",
    )
    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "user__email",
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

    def get_sex(self, obj):
        return obj.user.get_sex_display() if obj.user.sex else "-"

    get_sex.short_description = "Sexo"

    def get_bloodType(self, obj):
        return obj.user.bloodType or "-"

    get_bloodType.short_description = "Tipo Sanguíneo"

    def get_birthday(self, obj):
        return obj.user.birthday or "-"

    get_birthday.short_description = "Nascimento"

# ========================
# Classes
# ========================
@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "grade", "course", "get_supervisor", "get_teachers")
    search_fields = ("name", "course__titleCourse", "grade__name")
    list_filter = ("course", "grade")
    filter_horizontal = ("teachers",)

    def get_supervisor(self, obj):
        return (
            f"{obj.supervisor.user.first_name} {obj.supervisor.user.last_name}"
            if obj.supervisor
            else "-"
        )

    get_supervisor.short_description = "Supervisor"

    def get_teachers(self, obj):
        return ", ".join(
            [f"{t.user.first_name} {t.user.last_name}" for t in obj.teachers.all()]
        )

    get_teachers.short_description = "Professores"

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name",)
    filter_horizontal = ("teachers",)  # permite selecionar múltiplos professores

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("titleCourse", "description")
    search_fields = ("titleCourse", "description")
    filter_horizontal = ["subjects", "classrooms"]

    fieldsets = (
        ("Informações do Curso", {"fields": ("titleCourse", "description")}),
        ("Relacionamentos", {"fields": ("subjects", "classrooms")}),
    )

# ========================
# Registros simples
# ========================
# admin.site.register(Course)
admin.site.register(Grade)
admin.site.register(RegistrationClassroom)
admin.site.register(Lesson)
admin.site.register(Exam)
admin.site.register(Assignment)
admin.site.register(ExamResult)
admin.site.register(AssignmentResult)
admin.site.register(Attendance)
admin.site.register(Event)
admin.site.register(Announcement)
