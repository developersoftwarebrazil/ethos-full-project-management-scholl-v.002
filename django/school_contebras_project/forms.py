# school_contebras_project/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomUserCreationForm(UserCreationForm):
    """
    Cadastro de usuário comum (role = student).
    """
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = "student"
        if commit:
            user.save()
        return user


class SuperUserCreationForm(UserCreationForm):
    """
    Cadastro de superusuário (role = admin).
    """
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_staff = True
        user.is_superuser = True
        user.role = "admin"
        if commit:
            user.save()
        return user


class TeacherCreationForm(UserCreationForm):
    """
    Cadastro de professor (role = teacher).
    """
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = "teacher"
        if commit:
            user.save()
        return user


class SupervisorCreationForm(UserCreationForm):
    """
    Cadastro de supervisor (role = supervisor).
    """
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = "supervisor"
        if commit:
            user.save()
        return user
