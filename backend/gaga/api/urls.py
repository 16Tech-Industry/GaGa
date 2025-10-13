# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, MetricaViewSet

# 1. Crear el router
router = DefaultRouter()

# 2. Registrar TODAS las vistas en el router
router.register(r'users', UserViewSet, basename='user')
router.register(r'metricas', MetricaViewSet)

# 3. Finalmente, incluir las URLs del router en urlpatterns
urlpatterns = [
    path('', include(router.urls)),
]