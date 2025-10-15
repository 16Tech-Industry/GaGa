# gaga/api/views.py
from django.shortcuts import render, redirect
from rest_framework import viewsets
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

# Importamos los modelos y serializers que SÍ usamos
from .models import Metrica, Usuario
from .serializers import MetricaSerializer, UsuarioSerializer, CentralSerializer#, CentralSerializer
# Importamos el formulario de registro desde backends.py
from .backends import RegistroForm, ActualizacionUsuarioForm


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
        

class UsuarioListView(APIView):
    """
    Maneja las operaciones de listado (GET) y creación (POST) de usuarios.
    """
    def get(self, request):
        # Obtiene todos los usuarios
        usuarios = Usuario.objects.all()
        # Serializa la lista completa de usuarios (many=True es crucial)
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Reutiliza la lógica de RegistroView si se necesita crear un usuario desde el dashboard
        # O podrías usar un formulario de creación simplificado si no se necesita la contraseña.
        # Por simplicidad, aquí se llamaría a la lógica de Registro/Creación si se decidiera manejar POST aquí.
        # Para evitar duplicar lógica, se recomienda usar RegistroView para la creación.
        return Response({"error": "La creación (POST) se recomienda manejarla en RegistroView para consistencia."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# Vista para manejar GET, PUT, DELETE de un usuario específico
class UsuarioDetailView(APIView):
    """
    Maneja las operaciones GET, PUT y DELETE para un usuario específico.
    Se espera que la URL contenga el ID del usuario (pk).
    """
    
    def put(self, request, pk):
        data = request.data.copy()
        data['id'] = pk 

        form = ActualizacionUsuarioForm(data=data)
        
        if form.is_valid():
            usuario_actualizado = form.save()
            serializer = UsuarioSerializer(usuario_actualizado)
            return Response({
                "mensaje": "Usuario actualizado con éxito",
                "usuario": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            usuario = Usuario.objects.get(id_usuario=pk)
            usuario.delete()
            return Response({"mensaje": f"Usuario con ID {pk} eliminado con éxito"}, 
                            status=status.HTTP_204_NO_CONTENT)
        except Usuario.DoesNotExist:
            return Response({"error": f"Usuario con ID {pk} no encontrado"}, 
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Error al eliminar: {str(e)}"}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, pk):
        try:
            usuario = Usuario.objects.get(id_usuario=pk)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": f"Usuario con ID {pk} no encontrado"}, status=status.HTTP_404_NOT_FOUND)


# NUEVA VISTA: Para CRUD de Centrales
class CentralDetailView(APIView):
    """
    Maneja las operaciones GET, PUT y DELETE para una Central específica.
    """
    def get(self, request, pk):
        try:
            central = Central.objects.get(id_central=pk)
            # Se asegura de usar el Serializer correcto
            serializer = CentralSerializer(central) 
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Central.DoesNotExist:
            return Response({"error": f"Central con ID {pk} no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        # **PENDIENTE DE IMPLEMENTAR LÓGICA DE ACTUALIZACIÓN DE CENTRAL**
        # Aquí se usaría un formulario (ej: ActualizacionCentralForm)
        return Response({"mensaje": f"PUT de Central {pk} recibido. La lógica de actualización debe implementarse."}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            central = Central.objects.get(id_central=pk)
            central.delete()
            return Response({"mensaje": f"Central con ID {pk} eliminada con éxito"}, 
                            status=status.HTTP_204_NO_CONTENT)
        except Central.DoesNotExist:
            return Response({"error": f"Central con ID {pk} no encontrada"}, 
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Error al eliminar: {str(e)}"}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)