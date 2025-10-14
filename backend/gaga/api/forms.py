# En [tu_app]/forms.py
from django.contrib.auth.forms import UserCreationForm
from .models import empresas
from .models import Usuario
from django import forms

class RegistroForm(UserCreationForm):
    # Aquí puedes añadir campos adicionales
    email = forms.EmailField(required=True, label='Correo Electrónico')
    id_usuario = forms.CharField(max_length=100, required=True, label='ID de Usuario')
    nombre = forms.CharField(max_length=100, required=True, label='Nombre')
    apellido = forms.CharField(max_length=100, required=True, label='Apellido')
    cuit_empresa = forms.CharField(max_length=100, required=True, label='CUIT de la Empresa')
    rol = forms.ChoiceField(choices=[('admin', 'Admin'), ('user', 'User')], required=True, label='Rol')
    contrasenia = forms.CharField(widget=forms.PasswordInput, required=True, label='Contraseña')
    empresas_id_empresa = forms.CharField(max_length=100, required=True, label='ID de Empresa')

    class Meta(UserCreationForm.Meta):
        # Usamos el modelo de usuario por defecto (User) o tu modelo personalizado (CustomUser)
        model = Usuario
        fields = ('id_usuario', 'nombre', 'apellido', 'email', 'cuit_empresa', 'rol', 'contrasenia', 'empresas_id_empresa')
        
        # --- VALIDACIÓN DEL EMAIL ---
    def clean_email(self):
        # 1. Obtener el valor ya "limpiado" por el campo EmailField
        email = self.cleaned_data.get('email')
        
        # 2. Verificar si ya existe en la base de datos (excluyendo el objeto actual si estamos editando)
        qs = Usuario.objects.filter(email__iexact=email) # __iexact para búsqueda insensible a mayúsculas/minúsculas

        # Si el formulario está ligado a una instancia existente (edición), la excluimos del chequeo
        if self.instance and self.instance.pk:
            qs = qs.exclude(pk=self.instance.pk)
        
        if qs.exists():
            # 3. Lanzar un error de validación
            raise forms.ValidationError(
                "Este correo electrónico ya está registrado en el sistema."
            )
            
        # 4. Devolver el valor validado
        return email

    # --- VALIDACIÓN DEL CUIL Y VALIDACIÓN CRUZADA ---
    def clean(self):
        # Llamamos al método clean() base para que ejecute todas las validaciones de campo individuales
        cleaned_data = super().clean()
        
        cuil = cleaned_data.get("cuil")

        # Verificar si el CUIL ya existe (se puede hacer de forma similar al email)
        if cuil:
            qs_cuil = Empresas.objects.filter(cuil=cuil)

            if self.instance and self.instance.pk:
                qs_cuil = qs_cuil.exclude(pk=self.instance.pk)

            if qs_cuil.exists():
                # Añadir un error al campo CUIL
                self.add_error('cuil', 'Este CUIL ya está registrado por otra empresa.')
        return cleaned_data
