from django.db import models
from django.contrib.auth.models import AbstractUser

SEX_CHOICES = [
    ('MALE', 'Masculino'),
    ('FEMALE', 'Feminino'),
]

BLOOD_TYPE_CHOICES = [
    ('A+', 'A+'), ('A-', 'A-'),
    ('B+', 'B-'), ('AB+', 'AB-'),
    ('O+', 'O-'),
]


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
    roles = models.ManyToManyField("Role", related_name="users", blank=True)

    # Campos extras
    description = models.TextField(null=True, blank=True, verbose_name="Descrição")
    phone = models.CharField(max_length=20, unique=True, null=True, blank=True, verbose_name="Telefone")
    address = models.CharField(max_length=255, null=True, blank=True, verbose_name="Endereço")
    img = models.ImageField(upload_to="users/", null=True, blank=True, verbose_name="Foto")

    # 👇 Novos campos pessoais
    sex = models.CharField(max_length=10, choices=SEX_CHOICES, null=True, blank=True, verbose_name="Sexo")
    bloodType = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES, null=True, blank=True, verbose_name="Tipo Sanguíneo")
    birthday = models.DateField(null=True, blank=True, verbose_name="Data de Nascimento")


    def __str__(self):
        return self.username
