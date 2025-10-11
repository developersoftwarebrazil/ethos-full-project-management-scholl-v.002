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

        # Certifique-se de obter o usuário corretamente
        user = self.user if hasattr(self, 'user') and self.user is not None else User.objects.get(username=attrs.get('username'))

        # Adiciona campos extras na resposta
        data['username'] = user.username
        data['email'] = user.email
        data['description'] = getattr(user, 'description', "")
        data['sex'] = getattr(user, 'sex', "")
        data['bloodType'] = str(getattr(user, 'bloodType', "")) if getattr(user, 'bloodType', None) is not None else ""
        data['birthday'] = str(getattr(user, 'birthday', "")) if getattr(user, 'birthday', None) is not None else ""
        # Use the correct related name if roles are linked via a relationship
        data['roles'] = ', '.join([role.name for role in getattr(user, 'roles', Role.objects.none()).all()])

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
        # Use the correct related name if roles are linked via a relationship
        return [role.name for role in getattr(obj, 'roles', Role.objects.none()).all()]