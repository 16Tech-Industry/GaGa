# api/serializers.py

from rest_framework import serializers
from .models import Metrica, Usuario, Central
from django.contrib.auth.models import User as AuthUser # Importamos el modelo de usuario

# Definición del Serializer para el modelo Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Usuario.
    Utilizado para serializar (Py -> JSON) el objeto Usuario.
    """
    class Meta:
        model = Usuario
        
        fields = ['id_usuario',# id_usuario es la clave principal (pk)
                  'nombre', # Los campos nombre, apellido, email, rol son para visualización y edición
                  'apellido', 
                  'email', 
                  'cuit_empresa',# cuit_empresa para la relación con Empresa 
                  'rol'#Incluimos los campos necesarios para el dashboard de administrador y la actualización:
                  ] 
        # Excluimos 'password' (contrasenia) para seguridad, ya que no se necesita para la actualización básica.

class CentralSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Central.
    """
    class Meta:
        model = Central
        # Incluimos los campos necesarios para el ABM de Centrales
        # id_central es el pk, n_serie es clave, direccion es la ubicación, empresa es la FK.
        fields = ['id_central', 'n_serie', 'direccion', 'fecha_carga', 'empresa'] 
        # Asume que el campo 'empresa' es la clave foránea a la tabla Empresa


""" OLD
class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        # Es mejor elegir campos específicos en lugar de '__all__'
        # para no exponer datos sensibles como el hash de la contraseña.
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff']
"""
class MetricaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metrica
        fields = '__all__' # Incluimos todos los campos