# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MetricaViewSet, HistorialViewSet

# Intentar importar UserViewSet solo si existe
try:
    from .views import UserViewSet
except ImportError:
    UserViewSet = None

# 1️⃣ Creamos el router
router = DefaultRouter()

# 2️⃣ Registramos cada viewset con un basename único
if UserViewSet:
    router.register(r'users', UserViewSet, basename='user')

router.register(r'metricas', MetricaViewSet, basename='metrica')        # Endpoint para últimas métricas
router.register(r'historial', HistorialViewSet, basename='historial')   # Endpoint para historial completo

# 3️⃣ Incluimos las URLs del router en urlpatterns
urlpatterns = [
    path('', include(router.urls)),
]
