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


#definicion de las respuesas
class MetricaViewSet(viewsets.ModelViewSet):
    queryset = Metrica.objects.all()
    serializer_class = MetricaSerializer

# checkeo del login 
class LoginView(APIView):
    permission_classes = [AllowAny]
    # recibe el emial y contraseña
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        # verifica en la base de datos
        user = authenticate(request, username=email, password=password)

        if user is not None: # si no esta vacio lo que retorna existe el usuario 
            request.session['_auth_user_id'] = user.pk
            request.session.save()
            # se pasa el rol que tiene el usuario
            rol = user.rol
            # mensaje de retorno
            return Response({
                "mensaje": "Login exitoso",
                "rol": rol
                }, status=status.HTTP_200_OK)
        #si hay algun valor incorrecto da error
        else:
            return Response(
                {"error": "Email o contraseña incorrectos"},
                status=status.HTTP_401_UNAUTHORIZED
            )



class RegistroView(APIView):
    permission_classes = [AllowAny] # Cualquiera puede intentar registrarse

    def post(self, request):
        # Recibimos los datos del frontend
        datos = request.data
        
        # usamos la funcion "personalizada" que dejamos en backends.py
        form = RegistroForm(data=datos)
        
        # Comprobamos si los datos son válidos
        if form.is_valid():
            #.save() crea el nuevo usuario en la BD
            form.save()
            # respuesta de la creacion
            return Response({"mensaje": "Usuario creado con éxito"}, status=status.HTTP_201_CREATED)
        else:
            # Si no son válidos, devolvemos un diccionario con los errores
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)