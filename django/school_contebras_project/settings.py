"""
Django settings for school_contebras_project project.
"""

import os
import dj_database_url
from pathlib import Path

# ===========================
# Paths
# ===========================
BASE_DIR = Path(__file__).resolve().parent.parent

# ===========================
# Segurança
# ===========================
SECRET_KEY = 'django-insecure-kb^n626u=nio@d&@7_e#=^z1uzzkh%)ku3_8)z7nc@aqen#wu('
DEBUG = True

ALLOWED_HOSTS = ["*"]

# ===========================
# Apps
# ===========================

# ===========================
# User model customizado
# ===========================
AUTH_USER_MODEL = "school_contebras_core_accounts.User"  # <- adicione aqui

INSTALLED_APPS = [
    # Django core
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Terceiros
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",

    # Seus apps
    "school_contebras_core_video",
    "school_contebras_core_course",
    "school_contebras_core_accounts",
]

# ===========================
# Middleware
# ===========================
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # precisa vir antes do CommonMiddleware
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ===========================
# Templates
# ===========================
ROOT_URLCONF = "school_contebras_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR, "templates"],  # pasta templates
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "school_contebras_project.wsgi.application"

# ===========================
# Database
# ===========================
DATABASES = {
    "default": dj_database_url.config(default=os.environ.get("DATABASE_URL"))
}

# ===========================
# Passwords
# ===========================
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ===========================
# Internacionalização
# ===========================
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

LOGIN_REDIRECT_URL = "/"

# ===========================
# Arquivos estáticos e mídia
# ===========================
STATIC_URL = "static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

MEDIA_URL = os.environ.get("ASSETS_URL", " ") + "/"
MEDIA_ROOT = "/media/uploads/"

# ===========================
# Integrações externas
# ===========================
RABBITMQ_URL = os.environ.get("RABBITMQ_URL")
ASSETS_URL = os.environ.get("ASSETS_URL")

# ===========================
# DRF Config
# ===========================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

# ===========================
# CORS (para o Next.js acessar sua API)
# ===========================
CORS_ALLOW_ALL_ORIGINS = True  # ⚠️ Em produção, defina os domínios permitidos
CORS_ALLOW_CREDENTIALS = True
