# api/models.py

from django.db import models

# Modelo para representar la tabla CENTRALES
class Central(models.Model):
    id_central = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = '"gaga"."CENTRALES"'


# Modelo para representar tu tabla METRICAS
class Metrica(models.Model):
    id_metrica = models.AutoField(primary_key=True)
    fecha = models.DateTimeField()
    temperatura = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    humedad = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    viento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    litros_consumidos = models.DecimalField(max_digits=10, decimal_places=3, blank=True, null=True)
    watt_consumidos = models.DecimalField(max_digits=10, decimal_places=3, blank=True, null=True)
    centrales_id_central = models.ForeignKey(Central, models.DO_NOTHING, db_column='centrales_id_central')

    class Meta:
        managed = False
        db_table = '"gaga"."METRICAS"'