# api/models.py

from django.db import models

class Empresa(models.Model):
    """
    Representación de la tabla EMPRESAS.
    """
    id_empresa = models.AutoField(primary_key=True)
    email = models.CharField(max_length=160)
    nombre_empresa = models.CharField(max_length=160)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    cuit = models.BigIntegerField(unique=True)

    class Meta:
        managed = False  # Le dice a Django que no gestione esta tabla
        db_table = '"gaga"."EMPRESAS"'


class Usuario(models.Model):
    """
    Representación de la tabla USUARIOS.
    """
    # Django no soporta claves primarias compuestas,
    # así que designamos id_usuario como la principal para el ORM.
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=160, blank=True, null=True)
    apellido = models.CharField(max_length=45, blank=True, null=True)
    email = models.CharField(max_length=160, blank=True, null=True)
    cuit_empresa = models.BigIntegerField()

    # Mapeamos el campo 'contrasenia' a 'password' para compatibilidad
    password = models.CharField(max_length=16, db_column='contrasenia')
    
    # Campo para el rol con las opciones del CHECK
    ROL_CHOICES = [
        ('admin', 'Admin'),
        ('usuario', 'Usuario'),
    ]
    rol = models.CharField(max_length=10, choices=ROL_CHOICES, blank=True, null=True)

    # Relación ForeignKey con la tabla Empresa
    empresa = models.ForeignKey(
        Empresa, 
        models.DO_NOTHING, 
        db_column='empresas_id_empresa'
    )

    class Meta:
        managed = False
        db_table = '"gaga"."USUARIOS"'
        # Le informamos a Django de la clave primaria compuesta a nivel de base de datos
        unique_together = (('id_usuario', 'empresa', 'cuit_empresa'),)

    # Propiedades para que funcione con el sistema de login de Django
    @property
    def is_anonymous(self):
        return False

    @property
    def is_authenticated(self):
        return True

class Central(models.Model):
    """
    Representación de la tabla CENTRALES.
    Esta estructura coincide con los campos definidos en CentralSerializer.
    """
    id_central = models.AutoField(primary_key=True)
    n_serie = models.BigIntegerField()
    direccion = models.CharField(max_length=160, blank=True, null=True)
    fecha_carga = models.DateTimeField(blank=True, null=True)
    
    # Relación ForeignKey con la tabla Empresa (clave foránea)
    empresa = models.ForeignKey(
        Empresa, 
        models.DO_NOTHING, 
        db_column='empresas_id_empresa'
    )

    class Meta:
        managed = False
        db_table = '"gaga"."CENTRALES"'

class Metrica(models.Model):
    """
    Representación de la tabla METRICAS.
    """
    id_metrica = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True)
    temperatura = models.FloatField(blank=True, null=True)
    humedad = models.FloatField(blank=True, null=True)
    viento = models.FloatField(blank=True, null=True)
    litros_consumidos = models.FloatField(blank=True, null=True)
    watt_consumidos = models.FloatField(blank=True, null=True)
    
    # Relación ForeignKey con la tabla Central
    central = models.ForeignKey(
        Central, 
        models.DO_NOTHING, 
        db_column='centrales_id_central'
    )

    class Meta:
        managed = False
        db_table = '"gaga"."METRICAS"'

