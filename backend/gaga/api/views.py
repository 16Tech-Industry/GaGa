# api/views.py

from rest_framework import viewsets
from django.contrib.auth.models import User as AuthUser
from .serializers import AuthUserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = AuthUser.objects.all().order_by('-date_joined')
    serializer_class = AuthUserSerializer