from datetime import date, timedelta
import hashlib
import os
import time
from django.db import models
from django.utils import timezone
from django.utils.text import get_valid_filename

# ===========================
# Enums (Choices)
# ===========================s

SEX_CHOICES = [
    ('MALE', 'Masculino'),
    ('FEMALE', 'Feminino'),
]

DAY_CHOICES = [
    ('MONDAY', 'Segunda-feira'),
    ('TUESDAY', 'Terça-feira'),
    ('WEDNESDAY', 'Quarta-feira'),
    ('THURSDAY', 'Quinta-feira'),
    ('FRIDAY', 'Sexta-feira'),
]

# ===========================
# Função para upload seguro de arquivos
# ===========================
def file_name(instance, filename):
    sanitized_filename = get_valid_filename(filename)
    ext = os.path.splitext(sanitized_filename)[-1].lower()
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
    if ext not in allowed_extensions:
        raise ValueError(f"Extensão de arquivo '{ext}' não permitida.")
    hash_object = hashlib.md5(f"{sanitized_filename}{time.time()}".encode('utf-8'))
    hashed_filename = f"{hash_object.hexdigest()}{ext}"
    return os.path.join('thumbnails/', hashed_filename)

# ===========================
# MODELOS ESCOLARES
# ===========================

class SchoolAdmin(models.Model):
    name = models.CharField(max_length=150, verbose_name="Nome do Administrador")
    email = models.EmailField(unique=True, verbose_name="E-mail")
    password_hash = models.CharField(max_length=255, verbose_name="Senha (Hash)")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")

    class Meta:
        verbose_name = "Administrador"
        verbose_name_plural = "Administradores"

    def __str__(self):
        return self.name


class Course(models.Model):
    titleCourse = models.CharField(max_length=150, verbose_name="Título do curso")
    description = models.TextField(verbose_name="Descrição do curso")

    class Meta:
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"

    def __str__(self):
        return self.titleCourse


class Grade(models.Model):
    name = models.CharField(max_length=150, verbose_name="Nome da Série")
    description = models.TextField(verbose_name="Descrição da Série")

    class Meta:
        verbose_name = "Série"
        verbose_name_plural = "Séries"

    def __str__(self):
        return self.name


class Teacher(models.Model):
    name = models.CharField(max_length=150, verbose_name="Nome do Professor")
    email = models.EmailField(unique=True, verbose_name="E-mail")
    password_hash = models.CharField(max_length=255, verbose_name="Senha (Hash)")
    hire_date = models.DateField(verbose_name="Data de Contratação")
    phone = models.CharField(max_length=20, verbose_name="Telefone")
    subjects = models.ManyToManyField('Subject', related_name='teachers', verbose_name="Disciplinas")

    class Meta:
        verbose_name = "Professor"
        verbose_name_plural = "Professores"

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=150, verbose_name="Nome da Disciplina")
    description = models.TextField(verbose_name="Descrição da Disciplina")

    class Meta:
        verbose_name = "Disciplina"
        verbose_name_plural = "Disciplinas"

    def __str__(self):
        return self.name


class Classroom(models.Model):
    name = models.CharField(max_length=100, verbose_name='Turma')
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name='classrooms', verbose_name='Série')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='classrooms', verbose_name='Curso')
    supervisor = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, related_name='supervised_classrooms', verbose_name='Supervisor')

    class Meta:
        verbose_name = "Turma"
        verbose_name_plural = "Turmas"

    def __str__(self):
        return f'Turma {self.name} - {self.course.titleCourse}'


class Student(models.Model):
    username = models.CharField(max_length=100, unique=True, verbose_name='Nome de usuário')
    name = models.CharField(max_length=150, verbose_name='Nome')
    surname = models.CharField(max_length=100, verbose_name='Sobrenome')
    email = models.EmailField(max_length=100, verbose_name='E-mail')
    phone = models.CharField(max_length=20, verbose_name='Telefone')
    address = models.CharField(max_length=255, null=True, blank=True, verbose_name='Endereço')
    img = models.ImageField(upload_to=file_name, null=True, verbose_name='Foto', blank=True)
    sex = models.CharField(max_length=10, choices=SEX_CHOICES, verbose_name='Sexo')
    birthday = models.DateField(verbose_name='Data de Nascimento')
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    classroom = models.ForeignKey(Classroom, on_delete=models.SET_NULL, null=True, related_name='students', verbose_name='Turma')
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, null=True, related_name='students', verbose_name='Série')

    class Meta:
        verbose_name = "Aluno"
        verbose_name_plural = "Alunos"

    def __str__(self):
        return self.name


class RegistrationClassroom(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    registration_date = models.DateField(auto_now_add=True)
    last_monthly_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name = "Matrícula"
        verbose_name_plural = "Matrículas"

    def __str__(self):
        return f"{self.student.name} - {self.classroom.name}"

    def can_access(self, video):
        if not self.last_monthly_date:
            return False
        due_date = self.last_monthly_date + timedelta(days=30)
        return date.today() <= due_date


class Lesson(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, verbose_name='Turma')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name='Disciplina')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, verbose_name='Professor')
    date = models.DateField()
    start_time = models.TimeField(verbose_name='Hora de Início')
    end_time = models.TimeField(verbose_name='Hora de Término')
    topic = models.CharField(max_length=255, verbose_name='Tópico')

    class Meta:
        verbose_name = "Aula"
        verbose_name_plural = "Aulas"

    def __str__(self):
        return f"{self.subject.name} - {self.date}"


class Exam(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, verbose_name='Aula')
    title = models.CharField(max_length=150, verbose_name='Título da Prova')
    date = models.DateField(verbose_name='Data da Prova')
    max_score = models.IntegerField(verbose_name='Pontuação Máxima')

    class Meta:
        verbose_name = "Prova"
        verbose_name_plural = "Provas"

    def __str__(self):
        return self.title


class Assignment(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, verbose_name='Aula')
    title = models.CharField(max_length=150, verbose_name='Título da Atividade')
    description = models.TextField(verbose_name='Descrição da Atividade')
    due_date = models.DateField(verbose_name='Data de Entrega')
    max_score = models.IntegerField(verbose_name='Pontuação Máxima')

    class Meta:
        verbose_name = "Atividade"
        verbose_name_plural = "Atividades"

    def __str__(self):
        return self.title


class ExamResult(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, verbose_name='Prova')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name='Aluno')
    score = models.IntegerField(verbose_name='Pontuação')
    graded_at = models.DateTimeField(auto_now_add=True, verbose_name='Data de Correção')
    feedback = models.TextField(blank=True, verbose_name='Feedback')

    class Meta:
        verbose_name = "Nota da Prova"
        verbose_name_plural = "Notas de Provas"

    def __str__(self):
        return f"{self.student.name} - {self.exam.title}"


class AssignmentResult(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, verbose_name='Atividade')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name='Aluno')
    score = models.IntegerField(verbose_name='Pontuação')
    submitted_at = models.DateTimeField(auto_now_add=True, verbose_name='Data de Entrega')
    feedback = models.TextField(blank=True, verbose_name='Feedback')

    class Meta:
        verbose_name = "Resultado da Atividade"
        verbose_name_plural = "Resultados das Atividades"

    def __str__(self):
        return f"{self.student.name} - {self.assignment.title}"


class Attendance(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, verbose_name='Aula')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name='Aluno')
    status = models.CharField(max_length=10, choices=[("present", "Presente"), ("absent", "Ausente")], verbose_name='Status')
    date = models.DateField(default=timezone.now, verbose_name='Data')

    class Meta:
        verbose_name = "Frequência"
        verbose_name_plural = "Frequências"

    def __str__(self):
        return f"{self.student.name} - {self.lesson.date} - {self.status}"
