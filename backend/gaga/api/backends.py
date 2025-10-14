# api/backends.py

from django.contrib.auth.backends import BaseBackend
from .models import Usuario
from django.contrib.auth.forms import UserCreationForm
from .models import Empresa
from django import forms


class login_check(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            # Buscamos al usuario por su email en nuestra tabla USUARIOS
            user = Usuario.objects.get(email=username)
            
            # Verificamos la contraseña (¡OJO! Esto asume que la contraseña está en texto plano)
            if user.password == password:
                return user # Devolvemos el objeto de usuario si todo es correcto
            
        except Usuario.DoesNotExist:
            # Si el usuario no existe, no hacemos nada
            pass
        
        # Si la contraseña es incorrecta o el usuario no existe, devolvemos None
        return None

    def get_user(self, user_id):
        try:
            # Django usa esto para obtener el usuario en cada petición
            return Usuario.objects.get(pk=user_id)
        except Usuario.DoesNotExist:
            return None
        

class RegistroForm(forms.ModelForm):
    # Definimos explícitamente la contraseña para usar el widget de password
    # y asegurarnos de que no se muestre en texto plano.
    contrasenia = forms.CharField(widget=forms.PasswordInput, required=True)

    class Meta:
        # 1. Conectamos el formulario a tu modelo 'Usuario'
        model = Usuario
        
        # 2. Especificamos los campos que se validarán.
        #    Estos son los campos que tu API espera recibir en el POST.
        fields = [
            'nombre', 
            'apellido', 
            'email', 
            'cuit_empresa', 
            'rol', 
            'empresa' # Corresponde a 'empresas_id_empresa'
        ]

    # --- VALIDACIÓN DE EMAIL ÚNICO ---
    def clean_email(self):
        email = self.cleaned_data.get('email')
        
        # Busca si ya existe un usuario con ese email (ignorando mayúsculas/minúsculas)
        if Usuario.objects.filter(email__iexact=email).exists():
            # Si existe, lanza un error de validación.
            raise forms.ValidationError(
                "Este correo electrónico ya está registrado."
            )
        return email

    def clean(self):
            # Primero, ejecutamos la lógica de validación base.
            cleaned_data = super().clean()
            cuit = cleaned_data.get('cuit_empresa')
            
            if cuit:
                try:
                    # 1. Buscamos la empresa por su CUIT.
                    empresa_obj = Empresa.objects.get(cuit=cuit)
                    
                    # 2. Si la encontramos, asignamos el objeto empresa al campo 'empresa'.
                    #    Esto es crucial para que form.save() funcione correctamente.
                    cleaned_data['empresa'] = empresa_obj
                    
                except Empresa.DoesNotExist:
                    # 3. Si no existe ninguna empresa con ese CUIT, lanzamos un error.
                    self.add_error('cuit_empresa', 'No existe una empresa registrada con este CUIT.')
            
            # Siempre devolvemos los datos limpios.
            return cleaned_data
    
    
    # --- metodo para manejar la contraseña ---
    def save(self, commit=True):
        # 1. Obtenemos la instancia del usuario sin guardarla en la BD todavía.
        user = super().save(commit=False)
        
        # 2. Tomamos la contraseña del formulario y la asignamos al campo 'password' del modelo.
        user.password = self.cleaned_data["contrasenia"]
        
        # 3. Si commit es True, guardamos el usuario en la base de datos.
        if commit:
            user.save()
            
        return user