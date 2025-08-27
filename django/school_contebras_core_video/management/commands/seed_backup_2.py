# school_contebras_core_course/management/commands/seed.py
import datetime
import uuid

from django.core.management.base import BaseCommand
from django.utils import timezone
from school_contebras_core_course.models import (
    BLOOD_TYPE_CHOICES, SchoolAdmin, Course, Grade, Subject, Teacher, Classroom, Student, Lesson,
)
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = 'Seed initial data for the database'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding database...")

        # ========================
        # ADMIN
        # ========================
        admins_data = [
            {"username": "admin1", "name": "Admin 1", "email": "admin1@example.com"},
            {"username": "admin2", "name": "Admin 2", "email": "admin2@example.com"},
        ]

        for data in admins_data:
            obj, created = SchoolAdmin.objects.get_or_create(
                email=data["email"],
                defaults={
                    "id": str(uuid.uuid4()),
                    "username": data["username"],
                    "name": data["name"]
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Admin criado: {obj.username}"))
            else:
                self.stdout.write(self.style.WARNING(f"Admin já existe: {obj.username}"))
        # ========================
        # GRADE
        # ========================
        grades = []
        for i in range(1, 7):
            grade, _ = Grade.objects.get_or_create(
                name=f"Série {i}", defaults={"description": f"Descrição da Série {i}"}
            )
            grades.append(grade)

        # ========================
        # COURSE
        # ========================
        courses = []
        for i in range(1, 4):
            course, _ = Course.objects.get_or_create(
                titleCourse=f"Curso {i}", defaults={"description": f"Descrição do Curso {i}"}
            )
            courses.append(course)

        # ========================
        # SUBJECT
        # ========================
        subject_names = [
            "Matemática", "Ciências", "Inglês", "História", "Geografia",
            "Física", "Química", "Biologia", "Computação", "Arte"
        ]
        subjects = []
        for name in subject_names:
            subject, _ = Subject.objects.get_or_create(name=name, defaults={"description": f"Descrição de {name}"})
            subjects.append(subject)

        # ========================
        # TEACHER
        # ========================
      
        teachers = []

        # blood_types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
        blood_types = [choice[0] for choice in BLOOD_TYPE_CHOICES]
        sex_choices = ['MALE', 'FEMALE', 'OTHER']

        for i in range(1, 16):
            teacher, _ = Teacher.objects.get_or_create(
            email=f"teacher{i}@example.com",
            defaults={
            "username": f"teacher{i}",
            "name": f"TName{i}",
            "surname": f"TSurname{i}",
            "password_hash": "hash_teacher",
            "hire_date": date.today() - timedelta(days=365*5),
            "birthday": date.today() - timedelta(days=365*30 + random.randint(0, 365)),  # ~30 anos
            "phone": f"123-456-78{i:02d}",
            "address": f"Rua {i}, Bairro Exemplo, Cidade X",
            "bloodType": random.choice(blood_types),
            "sex": random.choice(sex_choices),
            "createdAt": timezone.now(),
            "img": None,  # ou algum valor padrão se desejar
        }
    )
    # Assign random subjects (pode ser mais de um)
        teacher.teaching_subjects.set(random.sample(subjects, k=min(len(subjects), random.randint(1, 5))))
        teachers.append(teacher)

        print(f"{len(teachers)} teachers seeded successfully!")

        # ========================
        # CLASSROOM
        # ========================
        classrooms = []
        for i, grade in enumerate(grades, 1):
            classroom, _ = Classroom.objects.get_or_create(
                name=f"{i}A",
                grade=grade,
                course=random.choice(courses),
                supervisor=random.choice(teachers)
            )
            classrooms.append(classroom)

        # ========================
        # STUDENT
        # ========================
        students = []
        grades = list(Grade.objects.all())
        classrooms = list(Classroom.objects.all())
        blood_types = [choice[0] for choice in BLOOD_TYPE_CHOICES]

        for i in range(1, 51):
            student, _ = Student.objects.get_or_create(
            username=f"student{i}",
            defaults={
                "id": str(uuid.uuid4()),  # gera um UUID para o campo id
                "name": f"SName{i}",
                "surname": f"SSurname{i}",
                "email": f"student{i}@example.com",
                "phone": f"987-654-32{i:02d}",
                "sex": "MALE" if i % 2 == 0 else "FEMALE",
                "bloodType": random.choice(blood_types),
                "address": f"Rua Exemplo {i}, Cidade XYZ",
                "birthday": date.today() - timedelta(days=365*10 + i),  # pequenas variações
                "grade": random.choice(grades),
                "classroom": random.choice(classrooms),
                "createdAt": timezone.now(),
                "img": None  # ou um caminho default se preferir
            }
        )
        students.append(student)
    
        print(f"{len(students)} estudantes inseridos/atualizados.")

        # ========================
        # LESSON
        # ========================
        day_choices = [choice[0] for choice in Lesson._meta.get_field("day").choices]

        for i in range(1, 31):
            subject = random.choice(subjects)
            
            # Escolhe um professor que leciona essa matéria
            eligible_teachers = list(subject.teachers.all())
            if not eligible_teachers:
                continue  # pula se nenhum professor disponível
            teacher = random.choice(eligible_teachers)

            Lesson.objects.get_or_create(
                name=f"Aula {i}",
                day=random.choice(day_choices),
                start_time=(timezone.now() + timedelta(hours=random.randint(7, 12))).time(),
                end_time=(timezone.now() + timedelta(hours=random.randint(13, 18))).time(),
                subject=subject,
                class_ref=random.choice(classrooms),
                teacher=teacher,
            )

        print(f"{Lesson.objects.count()} lessons inseridas/atualizadas.")


        self.stdout.write(self.style.SUCCESS("Database seeded successfully."))
