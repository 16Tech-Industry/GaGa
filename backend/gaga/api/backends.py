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
            
                # Verificamos la contraseña. 
            if user.password == password: # hay que tener en cuenta que en un caso real / practico deberiamos encriptarla. aca solamente se compara el texto plano
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
#-------------
# formulario de registro
#-------------
class RegistroForm(forms.ModelForm):
    # Definimos explícitamente la contraseña para usar el widget de password
    # y asegurarnos de que no se muestre en texto plano.
    contrasenia = forms.CharField(widget=forms.PasswordInput, required=True)

    class Meta:
        # Establece que modelo usar
        model = Usuario
        
        # Especificamos los campos que se validarán.
        #    Estos son los campos que la api espera recibir en el post.
        fields = [
            'nombre', 
            'apellido', 
            'email', 
            'cuit_empresa', 
            'rol', 
        ]

    # -----------
    # validacion para el mail
    # -----------
    def clean_email(self):
        email = self.cleaned_data.get('email')
        
        # Busca si ya existe un usuario con ese email
        if Usuario.objects.filter(email__iexact=email).exists():
            # Si existe, lanza un error de validación.
            raise forms.ValidationError(
                "Este correo electrónico ya está registrado."
            )
        return email
    #------------------
    # Validacionde que exista la empresa con su cuit
    #------------------
    def clean(self):
            # Primero, ejecutamos la lógica de validación base.
                        # super: especifica herencia para inicializar la clase padre
            cleaned_data = super().clean()
            cuit = cleaned_data.get('cuit_empresa')
            
            if cuit:
                try:
                    # Buscamos la empresa por su CUIT.
                    empresa_obj = Empresa.objects.get(cuit=cuit)
                    
                    # Si la encontramos, asignamos el objeto empresa al campo 'empresa'.
                    cleaned_data['empresa'] = empresa_obj
                    
                except Empresa.DoesNotExist:
                    # Si no existe ninguna empresa con ese CUIT, devolvemos el error.
                    self.add_error('cuit_empresa', 'No existe una empresa registrada con este CUIT.')
            
            # Siempre devolvemos los datos limpios.
            return cleaned_data
    
    
    # --- metodo para manejar la contraseña ---
    def save(self, commit=True):
        # Obtenemos la instancia del usuario sin guardarla en la BD.
        user = super().save(commit=False)
        
        # Tomamos la contraseña del formulario y la asignamos al campo 'password' del modelo temporal de django.
        user.password = self.cleaned_data["contrasenia"]
        # el metodo clean hace un sepillado rapido de la base de datos, toma el cuil y hjace la busqueda de la empresa, y de ahi toma el el id y lo guarda en lña base de datos
        user.empresa = user.empresa = self.cleaned_data['empresa']
        # Si commit es True, guardamos el usuario en la base de datos.
        if commit:
            user.save()
            
        return user