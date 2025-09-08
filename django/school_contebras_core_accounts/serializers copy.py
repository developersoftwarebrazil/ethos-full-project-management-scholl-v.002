from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer customizado para incluir o 'role' do usuário no JWT.
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Inclui role no token, assumindo que o usuário tenha o atributo 'role'
        token["role"] = getattr(user, "role", "admin")
        return token
