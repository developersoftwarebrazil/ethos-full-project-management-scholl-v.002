from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', include('school_contebras_core_video.urls')),
    path('admin/', admin.site.urls),

    # JWT
    path("api/accounts/", include("school_contebras_core_accounts.urls")),

    # Autenticação nativa do Django (login/logout/password_reset)
    path('accounts/', include('django.contrib.auth.urls')),

    # Login explícito (se quiser sobrescrever template)
    path('login/', auth_views.LoginView.as_view(), name='login'),

    # Registro customizado (students, teachers, supervisor, superuser)
    path("accounts/", include("school_contebras_project.auth_urls")),

    # API REST do curso
    path('api/', include('school_contebras_core_course.urls')),
]
