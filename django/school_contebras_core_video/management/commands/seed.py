# school_contebras_core_course/management/commands/seed.py
import uuid
from django.core.management.base import BaseCommand
from django.utils import timezone
from school_contebras_core_course.models import (
    SchoolAdmin, Course, Grade, Subject, Teacher, Classroom, Student, Lesson,
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
        for i in range(1, 16):
            teacher, _ = Teacher.objects.get_or_create(
                email=f"teacher{i}@example.com",
                defaults={
                    "name": f"TName{i}",
                    "password_hash": "hash_teacher",
                    "hire_date": date.today() - timedelta(days=365*5),
                    "phone": f"123-456-78{i:02d}",
                }
            )
            # Assign subjects randomly
            teacher.subjects.set([random.choice(subjects)])
            teachers.append(teacher)

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
        for i in range(1, 51):
            student, _ = Student.objects.get_or_create(
                username=f"student{i}",
                defaults={
                    "name": f"SName{i}",
                    "surname": f"SSurname{i}",
                    "email": f"student{i}@example.com",
                    "phone": f"987-654-32{i:02d}",
                    "sex": "MALE" if i % 2 == 0 else "FEMALE",
                    "birthday": date.today() - timedelta(days=365*10),
                    "grade": random.choice(grades),
                    "classroom": random.choice(classrooms)
                }
            )
            students.append(student)

        # ========================
        # LESSON
        # ========================
        for i in range(1, 31):
            Lesson.objects.get_or_create(
                classroom=random.choice(classrooms),
                subject=random.choice(subjects),
                teacher=random.choice(teachers),
                date=date.today() + timedelta(days=i),
                start_time=timezone.now().time(),
                end_time=(timezone.now() + timedelta(hours=1)).time(),
                topic=f"Tópico {i}"
            )

        self.stdout.write(self.style.SUCCESS("Database seeded successfully."))
