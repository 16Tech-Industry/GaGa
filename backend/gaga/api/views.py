# api/views.py

from rest_framework import viewsets
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

# Importamos los modelos y serializers que SÍ usamos
from .models import Metrica
from .serializers import MetricaSerializer
# Importamos el formulario de registro desde backends.py
from .backends import RegistroForm


class MetricaViewSet(viewsets.ModelViewSet):
    queryset = Metrica.objects.all()
    serializer_class = MetricaSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username=email, password=password)

        if user is not None:
            request.session['_auth_user_id'] = user.pk
            request.session.save()
            rol = user.rol
            
            return Response({
                "mensaje": "Login exitoso",
                "rol": rol,
                "usuario": {
                    "id": user.id_usuario,
                    "email": user.email,
                    "nombre": user.nombre
                }
            }, status=status.HTTP_200_OK)
        
        else:
            return Response(
                {"error": "Email o contraseña incorrectos"},
                status=status.HTTP_401_UNAUTHORIZED
            )


# --- NUEVA VISTA DE REGISTRO BASADA EN CLASES ---
class RegistroView(APIView):
    permission_classes = [AllowAny] # Cualquiera puede intentar registrarse

    def post(self, request):
        # 1. Recibimos los datos que envía el frontend
        datos = request.data
        
        # 2. Pasamos los datos al formulario para que los valide
        form = RegistroForm(data=datos)
        
        # 3. Comprobamos si los datos son válidos
        if form.is_valid():
            # Si son válidos, .save() crea el nuevo usuario en la BD
            form.save()
            return Response({"mensaje": "Usuario creado con éxito"}, status=status.HTTP_201_CREATED)
        else:
            # Si no son válidos, devolvemos un diccionario con los errores
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)