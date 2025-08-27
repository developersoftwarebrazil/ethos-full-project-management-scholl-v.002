from django.contrib import admin
from django.forms import ValidationError
from django.http import HttpRequest

from school_contebras_core_course.models import (
    Announcement, Student, Course, Classroom, RegistrationClassroom,
    SchoolAdmin, Teacher, Subject, Grade, Lesson,
    Exam, Assignment, ExamResult, AssignmentResult, Attendance, Event
)

admin.site.site_header = 'Painel Administrativo da Escola Contebras'

# ========================
# MODELOS EXISTENTES
# ========================

class CourseAdmin(admin.ModelAdmin):
    list_display = ('titleCourse', 'description')
    list_filter = ('titleCourse', 'description')
    search_fields = ('titleCourse', 'description')


class StudentAdmin(admin.ModelAdmin):
 # Colunas exibidas na lista
    list_display = (
        'username', 'name', 'surname', 'email', 'phone',
        'bloodType', 'sex', 'birthday', 'classroom', 'grade', 'createdAt'
    )
    
    # # Filtros laterais
    # list_filter = (
    #     'sex', 'bloodType', 'classroom', 'grade', 'createdAt'
    # )
    
    # # Campos pesquisáveis
    # search_fields = (
    #     'username', 'name', 'surname', 'email', 'phone'
    # )
    
    # # Ordem padrão
    # ordering = ('-createdAt',)
    
    # # Campos somente leitura
    # readonly_fields = ('createdAt',)
    
    # # Organização do formulário de edição
    # fieldsets = (
    #     ('Informações Básicas', {
    #         'fields': ('id', 'username', 'name', 'surname', 'email', 'phone')
    #     }),
    #     ('Detalhes Pessoais', {
    #         'fields': ('sex', 'birthday', 'bloodType', 'address', 'img')
    #     }),
    #     ('Acadêmico', {
    #         'fields': ('classroom', 'grade')
    #     }),
    #     ('Sistema', {
    #         'fields': ('createdAt',),
    #     }),
    # )

class ClassroomAdmin(admin.ModelAdmin):
    list_display = ('name', 'course')
    list_filter = ('name', 'course')
    search_fields = ('name', 'course__titleCourse')


class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('student', 'classroom', 'registration_date')
    list_filter = ('student', 'classroom', 'registration_date')
    search_fields = ('student__name', 'classroom__name')
    date_hierarchy = 'registration_date'

    def save_model(self, request: HttpRequest, obj, form, change):
        if not obj.student or not obj.course:
            raise ValidationError("A matrícula só pode ser feita se houver um aluno e um curso.")
        super().save_model(request, obj, form, change)


# ========================
# NOVOS MODELOS ESCOLARES
# ========================

@admin.register(SchoolAdmin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ('username','name','email')
    search_fields = ('username','name','email')



class SubjectInline(admin.TabularInline):
    model = Subject.teachers.through  # tabela intermediária do ManyToMany
    extra = 1

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    # Campos exibidos na lista
    list_display = (
        'id',
        'username',
        'name',
        'surname',
        'email',
        'phone',
        'sex',
        'bloodType',
        'hire_date',
        'birthday',
        'createdAt'
    )

    # Campos pesquisáveis
    search_fields = (
        'username',
        'name',
        'surname',
        'email',
        'phone',
        'address',
    )

    # Filtros laterais
    list_filter = (
        'sex',
        'bloodType',
        'hire_date',
        'createdAt',
        # 'subjects',
    )

    # Campos que podem ser editáveis diretamente na lista
    list_editable = (
        'phone',
        'email',
        'sex',
        'bloodType',
    )

    # Exibir muitos-para-muitos inline (opcional)
   
    inlines = [SubjectInline]  # <- mostra a relação ManyToMany inline

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name", "description")
    filter_horizontal = ("teachers",)  # para facilitar seleção ManyToMany


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("name", "day", "start_time", "end_time", "subject", "class_ref", "teacher")
    list_filter = ("day", "subject", "class_ref", "teacher")
    search_fields = ("name", "subject__name", "teacher__name")
@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('title', 'lesson', 'date', 'max_score')
    list_filter = ('lesson', 'date')
    search_fields = ('title',)


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'lesson', 'due_date', 'max_score')
    list_filter = ('lesson', 'due_date')
    search_fields = ('title', 'description')


@admin.register(ExamResult)
class ExamResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'exam', 'score', 'graded_at')
    list_filter = ('exam', 'graded_at')
    search_fields = ('student__name', 'exam__title')


@admin.register(AssignmentResult)
class AssignmentResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'assignment', 'score', 'submitted_at')
    list_filter = ('assignment', 'submitted_at')
    search_fields = ('student__name', 'assignment__title')


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'lesson', 'status', 'date')  # 'date' no lugar de 'recorded_at'
    list_filter = ('lesson', 'status', 'date')
    search_fields = ('student__name', 'lesson__topic')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "start_time", "end_time", "class_ref")
    list_filter = ("class_ref", "start_time", "end_time")
    search_fields = ("title", "description")


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "class_ref")
    list_filter = ("class_ref", "date")
    search_fields = ("title", "description")


# Registrando os modelos existentes
admin.site.register(Course, CourseAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Classroom, ClassroomAdmin)
admin.site.register(RegistrationClassroom, RegistrationAdmin)
