# api/serializers.py

from rest_framework import serializers
from .models import Metrica
from django.contrib.auth.models import User as AuthUser  # Modelo de usuario

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff']

class MetricaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metrica
        fields = '__all__'  # Todos los campos existentes

class HistorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metrica
        fields = [
            'id_metrica', 'fecha', 'temperatura', 'humedad',
            'litros_consumidos', 'watt_consumidos'
        ]
