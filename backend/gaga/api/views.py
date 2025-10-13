# api/views.py

from rest_framework import viewsets
from django.contrib.auth.models import User as AuthUser
from .serializers import AuthUserSerializer, MetricaSerializer
from .models import Metrica

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = AuthUser.objects.all().order_by('-date_joined')
    serializer_class = AuthUserSerializer

class MetricaViewSet(viewsets.ModelViewSet):
    """
    API endpoint para ver las métricas.
    """
    queryset = Metrica.objects.all()
    serializer_class = MetricaSerializer
