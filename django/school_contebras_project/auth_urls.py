from django.urls import path
from . import views

urlpatterns = [
    path("register/user/", views.register_user, name="register_user"),
    path("register/teacher/", views.register_teacher, name="register_teacher"),
    path("register/supervisor/", views.register_supervisor, name="register_supervisor"),
    path("register/superuser/", views.register_superuser, name="register_superuser"),
]
