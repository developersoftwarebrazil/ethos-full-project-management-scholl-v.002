# school_contebras_core_accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser
from django.db import models


class Role(models.Model):
    """
    Representa um tipo de role do usuário no sistema.
    Ex: admin, teacher, student, supervisor, common
    """
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    roles = models.ManyToManyField(Role, related_name="users", blank=True)

    # Campos extras opcionais
    phone = models.CharField(max_length=20, unique=True, null=True, blank=True, verbose_name="Telefone")
    address = models.CharField(max_length=255, null=True, blank=True, verbose_name="Endereço")
    img = models.ImageField(upload_to="users/", null=True, blank=True, verbose_name="Foto")

    def __str__(self):
        return self.username

    # Propriedades para checar roles
    def has_role(self, role_name: str) -> bool:
        return self.roles.filter(name=role_name).exists()

    @property
    def is_teacher(self):
        return self.has_role("teacher")

    @property
    def is_student(self):
        return self.has_role("student")

    @property
    def is_admin(self):
        return self.has_role("admin")

    @property
    def is_supervisor(self):
        return self.has_role("supervisor")

    @property
    def is_common(self):
        return self.has_role("common")
    
