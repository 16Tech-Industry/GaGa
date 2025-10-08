# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User as AuthUser # Importamos el modelo de usuario

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        # Es mejor elegir campos específicos en lugar de '__all__'
        # para no exponer datos sensibles como el hash de la contraseña.
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff']