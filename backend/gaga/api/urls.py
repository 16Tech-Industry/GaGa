# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

# Crea un router y registra nuestro viewset con él.
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

# Las URLs de la API son ahora determinadas automáticamente por el router.
urlpatterns = [
    path('', include(router.urls)),
]