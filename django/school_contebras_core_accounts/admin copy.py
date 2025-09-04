from django.contrib import admin

# Register your models here.
# school_contebras_core_accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("username", "email", "role", "is_staff", "is_superuser")
    list_filter = ("role", "is_staff", "is_superuser")
    fieldsets = UserAdmin.fieldsets + (
        ("Funções", {"fields": ("role",)}),  # 👈 adiciona o campo "role" na edição
    )
