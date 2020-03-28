from rest_framework import status, viewsets
from helper_zero.serializers import UserSerializer
from helper_zero.models import User


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
