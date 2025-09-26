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
        token['description'] = user.description  # 👈 agora vai
        token['email'] = user.email
        token['sex'] = user.sex
        token['bloodType'] = user.bloodType
        token['birthday'] = user.birthday
        return token
    
    
    def validate(self, attrs):
        data = super().validate(attrs)

        # Adiciona campos extras na resposta
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['description'] = self.user.description
        data['sex'] = self.user.sex
        data['bloodType'] = self.user.bloodType
        data['birthday'] = self.user.birthday
        data['roles'] = [role.name for role in self.user.roles.all()]

        return data
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
            "description",
            "phone",
            "address",
            'sex',
            'bloodType',
            'birthday',
            "img",
        ]
    def get_roles(self, obj):
        return [role.name for role in obj.roles.all()]