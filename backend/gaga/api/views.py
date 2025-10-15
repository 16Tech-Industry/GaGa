# api/views.py

from rest_framework import viewsets
from .models import Metrica
from .serializers import MetricaSerializer, HistorialSerializer

class MetricaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Metrica.objects.all().order_by('-fecha')[:100]  # últimas 100 métricas
    serializer_class = MetricaSerializer

class HistorialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Metrica.objects.all().order_by('fecha')  # historial completo
    serializer_class = HistorialSerializer  # <- este es el cambio clave
