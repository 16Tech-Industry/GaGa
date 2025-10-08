import psycopg2, requests, datetime, random

# establece datos para la conexion
conector =psycopg2.connect(
            host="localhost",
            database="postgres",
            user="postgres",
            password="admin",
            port="5432"
        )
#ejecutador para consultas
cur = conector.cursor()
cur.execute(f"SET search_path TO gaga;")


def get_metricas():
    '''
    ## obtener metricas de la api
    Simulador para las metricas, se obtiene la temperatura, humedad y viento de la api de openweathermap
    y se simulan los valores de consumo de agua y energia electrica
    '''
    url = '''https://api.openweathermap.org/data/2.5/weather?units=metric&lat=-31.4082913&lon=-64.1959429&appid=d0713df127f4895e41f66a21d8a4783b'''
    response = requests.get(url)
    data = response.json()
    data_estructurada = {
    'temperatura' : data['main']['temp'],
    'humedad' : data['main']['humidity'],
    'viento' : data['wind']['speed'],
    'fecha' : datetime.datetime.now(),
    # valor de simulacion de una empresa mediana
    'watts' : random.randrange(5000, 9999),
    # valor basado en el consumo de una fabrica textil (Litros*Dia)
    'litros' : random.randrange(2500, 3000),
    'id_central': random.randrange(1, 3)
    }
    print(data_estructurada)
    return data_estructurada

def insert_metricas(valores):
    '''
    ## Inserta metricas en la base de datos
    
    '''
    insert = (
        valores['fecha'],
        valores['temperatura'],
        valores['humedad'],
        valores['viento'],
        valores['litros'],
        valores['watts'],
        valores['id_central']
    )
    print(insert)
    cur.execute('''insert into gaga."METRICAS"
            (id_metrica,fecha,
            temperatura,humedad, viento, 
            litros_consumidos, watt_consumidos, 
            centrales_id_central) 
            values (default, %s, %s, %s, %s, %s, %s, %s);''',insert)
    conector.commit()
"""
cur.execute(f"SET search_path TO gaga, public;")

cur.execute('insert into gaga."EMPRESAS" (email, nombre_empresa, direccion, cuit ) values (%s, %s, %s, %s);',
            ("Empresa@empresa","lamus mu", "Calle Falsa 123", "5551234"))

cur.execute('SELECT * FROM gaga."EMPRESAS";')
rows = cur.fetchall()
"""
valores = get_metricas()
insert_metricas(valores)

cur.close()
conector.close()