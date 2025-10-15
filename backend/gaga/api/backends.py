# api/backends.py

from django.contrib.auth.backends import BaseBackend
from .models import Usuario, Empresa
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.db import IntegrityError


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

class ActualizacionUsuarioForm(forms.Form):
    """
    Formulario para validar y actualizar un usuario existente.
    Utiliza un enfoque de Forms/ModelForms para la gestión de datos
    """
    # Se requiere el ID del usuario para saber qué registro actualizar
    id = forms.IntegerField(required=True) 
    
    # Campos que se actualizarán desde el modal del administrador
    nombre = forms.CharField(max_length=160, required=True)
    apellido = forms.CharField(max_length=45, required=False)
    email = forms.EmailField(max_length=160, required=True)
    cuit_empresa = forms.IntegerField(required=True)
    # Nota: No se requiere 'contrasenia' ni 'rol' aquí,
    # ya que se asume que el frontend no los modifica,
    # o bien, se actualizarían en una vista/formulario separada.
    
    # Propiedad para almacenar la instancia del usuario y empresa
    usuario_obj = None
    empresa_obj = None

    def clean_id(self):
        """Verifica que el ID de usuario a actualizar exista."""
        user_id = self.cleaned_data.get('id')
        try:
            # Almacena la instancia para usarla en el método save()
            self.usuario_obj = Usuario.objects.get(id_usuario=user_id) 
        except Usuario.DoesNotExist:
            raise forms.ValidationError("El ID de usuario no existe.")
        return user_id

    def clean_cuit_empresa(self):
        """Verifica que el CUIT de la nueva empresa exista."""
        cuit = self.cleaned_data.get('cuit_empresa')
        try:
            # Almacena la instancia de Empresa para usarla en el método save()
            self.empresa_obj = Empresa.objects.get(cuit=cuit) 
        except Empresa.DoesNotExist:
            raise forms.ValidationError("No existe ninguna empresa con el CUIT proporcionado.")
        return cuit

    def clean_email(self):
        """Verifica que el nuevo email sea único (excluyendo al usuario actual)."""
        email = self.cleaned_data.get('email')
        user_id = self.cleaned_data.get('id')
        
        # Solo verifica si se ha podido obtener el ID
        if user_id:
            # Excluye al usuario actual de la búsqueda para permitir guardar el mismo email
            if Usuario.objects.filter(email=email).exclude(id_usuario=user_id).exists():
                raise forms.ValidationError("Este correo electrónico ya está registrado por otro usuario.")
        
        return email
            
    def save(self):
        """
        Actualiza los campos del usuario en la base de datos.
        """
        # Se obtiene la instancia del usuario previamente validada
        user = self.usuario_obj 
        
        # 1. Actualizar los campos que llegaron desde el frontend
        user.nombre = self.cleaned_data['nombre']
        user.apellido = self.cleaned_data['apellido']
        user.email = self.cleaned_data['email']
        user.cuit_empresa = self.cleaned_data['cuit_empresa']
        
        # 2. Actualizar la clave foránea 'empresa'
        user.empresa = self.empresa_obj # Se asigna la instancia de Empresa validada
        
        try:
            user.save()
        except IntegrityError as e:
            # Este es un mecanismo de seguridad para errores no capturados por las validaciones clean_
            raise forms.ValidationError("Error de base de datos al actualizar el usuario.")
        
        # Retorna la instancia actualizada
        return user