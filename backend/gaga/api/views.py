# api/views.py
from django.shortcuts import render, redirect
from rest_framework import viewsets
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.forms import UserCreationForm
from .serializers import AuthUserSerializer, MetricaSerializer
from .models import Metrica
from .serializers import MetricaSerializer, HistorialSerializer

class MetricaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Metrica.objects.all().order_by('-fecha')[:100]  # últimas 100 métricas
    serializer_class = MetricaSerializer

def vista_registro(request):
    # Cuando el usuario envía el formulario (POST)
    if request.method == 'POST':
        form = UserCreationForm(request.POST) # O RegistroForm(request.POST)
        
        if form.is_valid():
            # 1. Crear y guardar el nuevo objeto User en la DB.
            #    UserCreationForm ya se encarga de hashear la contraseña
            form.save() 
            
            # 2. Redirigir al usuario a la página de login o a donde sea necesario
            return redirect('login') # Asegúrate de que 'login' está definido en tus URLs
            
    # Cuando el usuario pide la página (GET)
    else:
        form = UserCreationForm() # O RegistroForm()
        
    # Renderizar el formulario (ya sea vacío o con errores si la validación falló)
    return render(request, 'registro.html', {'form': form})
class HistorialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Metrica.objects.all().order_by('fecha')  # historial completo
    serializer_class = HistorialSerializer  # <- este es el cambio clave
