from rest_framework import serializers
from .models import Teacher,Student, Course, Classroom

class TeacherSerializer(serializers.ModelSerializer):
    # Se quiser incluir as disciplinas como lista de nomes:
    subjects = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Teacher
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'
