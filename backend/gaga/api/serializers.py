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
    id = serializers.IntegerField(source='id_usuario', read_only=True)
    class Meta:
        model = Usuario
        
        fields = ['id',# id_usuario es la clave principal (pk)
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
    # Se añade esta línea para que el campo en el JSON de salida
    # coincida exactamente con el modelo de Angular.
    EMPRESAS_id_empresa = serializers.IntegerField(source='empresa.id_empresa')

    class Meta:
        model = Central
        # Se actualiza la lista de campos para usar el nuevo campo
        # y se elimina el campo 'empresa' para no duplicar datos.
        fields = ['id_central', 'n_serie', 'direccion', 'fecha_carga', 'EMPRESAS_id_empresa']


class MetricaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metrica
        fields = '__all__' # Incluimos todos los campos