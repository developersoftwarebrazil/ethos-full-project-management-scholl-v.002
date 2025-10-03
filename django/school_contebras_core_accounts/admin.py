# Register your models here.
# school_contebras_core_accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Role, User


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    search_fields = ("name",)

@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "first_name", "last_name", "phone", "description", "get_roles")
    search_fields = ("username", "email", "first_name", "last_name", "phone")

    filter_horizontal = ("roles",)



    def get_roles(self, obj):
        return ", ".join([role.name for role in obj.roles.all()])
    get_roles.short_description = "Roles"
