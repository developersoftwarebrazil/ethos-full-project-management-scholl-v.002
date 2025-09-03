# school_contebras_core_accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("common", "Common"),
        ("teacher", "Teacher"),
        ("student", "Student"),
        ("supervisor", "Supervisor"),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="common")

    """
    Usuário central do sistema.
    - Contém login, senha e dados básicos de identificação
    - Pode assumir diferentes "roles" no sistema
    """
    def __str__(self):
        return f"{self.username} ({self.role})"

    @property
    def is_teacher(self):
        return self.role == "teacher"

    @property
    def is_common(self):
        return self.role == "common"

    @property
    def is_student(self):
        return self.role == "student"

    @property
    def is_admin(self):
        return self.role == "admin"

    @property
    def is_supervisor(self):
        return self.role == "supervisor"

 # Campos extras opcionais
    phone = models.CharField(max_length=20, unique=True, null=True, blank=True, verbose_name="Telefone")
    address = models.CharField(max_length=255, null=True, blank=True, verbose_name="Endereço")
    img = models.ImageField(upload_to="users/", null=True, blank=True, verbose_name="Foto")

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

