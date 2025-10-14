# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Importa la nueva RegistroView
from .views import MetricaViewSet, LoginView, RegistroView

router = DefaultRouter()
router.register(r'metricas', MetricaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    # AÑADE ESTA LÍNEA PARA LA RUTA DE REGISTRO
    path('registro/', RegistroView.as_view(), name='registro'),
]