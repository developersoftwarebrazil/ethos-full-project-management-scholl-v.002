from django import forms
from django.contrib import admin
from .models import (
    SchoolAdmin, Course, Grade, Teacher, Subject, Classroom, Student,
    RegistrationClassroom, Lesson, Exam, Assignment,
    ExamResult, AssignmentResult, Attendance, Event, Announcement
)

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
# Teacher
# ========================
class TeacherForm(forms.ModelForm):
    # Campos do user
    phone = forms.CharField(max_length=20, required=False, label="Telefone")
    address = forms.CharField(max_length=255, required=False, label="Endereço")
    img = forms.ImageField(required=False, label="Foto")

    class Meta:
        model = Teacher
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.user:
            self.fields["phone"].initial = self.instance.user.phone
            self.fields["address"].initial = self.instance.user.address
            self.fields["img"].initial = self.instance.user.img

    def save(self, commit=True):
        teacher = super().save(commit=False)
        if teacher.user:
            teacher.user.phone = self.cleaned_data.get("phone")
            teacher.user.address = self.cleaned_data.get("address")
            teacher.user.img = self.cleaned_data.get("img")
            teacher.user.save()
        if commit:
            teacher.save()
        return teacher

# Admin
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
# Registros simples
# ========================
admin.site.register(Course)
admin.site.register(Grade)
admin.site.register(Subject)
admin.site.register(Classroom)
admin.site.register(RegistrationClassroom)
admin.site.register(Lesson)
admin.site.register(Exam)
admin.site.register(Assignment)
admin.site.register(ExamResult)
admin.site.register(AssignmentResult)
admin.site.register(Attendance)
admin.site.register(Event)
admin.site.register(Announcement)
