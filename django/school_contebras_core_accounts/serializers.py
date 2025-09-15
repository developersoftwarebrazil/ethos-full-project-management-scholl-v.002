from rest_framework import serializers
from .models import User, Role

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Adiciona campos customizados
        token['username'] = user.username
        token['email'] = user.email
        return token
class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()
    img = serializers.ImageField(use_url=True, required=False, allow_null=True)
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "roles",
            "phone",
            "address",
            "img",
        ]
    def get_roles(self, obj):
        return [role.name for role in obj.roles.all()]