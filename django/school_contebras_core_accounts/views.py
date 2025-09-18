from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
    
class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Endpoint de login que retorna JWT com role incluído.
    """
    serializer_class = CustomTokenObtainPairSerializer
