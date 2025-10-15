# gaga/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Importa la nueva RegistroView
from .views import(
    MetricaViewSet, 
    LoginView, 
    RegistroView, 
    UsuarioDetailView,
    CentralDetailView,
    UsuarioListView# <-- IMPORTAR
)
router = DefaultRouter()
router.register(r'metricas', MetricaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    # AÑADE ESTA LÍNEA PARA LA RUTA DE REGISTRO
    path('registro/', RegistroView.as_view(), name='registro'),

    # Rutas para la gestión de Usuarios
    # GET (Lista) y POST (Crear) para la lista de usuarios
    path('admin/usuarios/', UsuarioListView.as_view(), name='admin-usuario-list'), 

    # GET (Detalle), PUT (Modificar), DELETE (Eliminar) para un usuario específico
    path('admin/usuario/<int:pk>/', UsuarioDetailView.as_view(), name='admin-usuario-detail'), 
    
    # Rutas para la gestión de Centrales
    # GET (Detalle), PUT (Modificar), DELETE (Eliminar) para una central específica
    path('admin/central/<int:pk>/', CentralDetailView.as_view(), name='admin-central-detail'),
    
]