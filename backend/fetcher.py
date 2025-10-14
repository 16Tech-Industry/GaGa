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
    # covierte la data en un formato json
    data = response.json()
    #mejoramos el orden  de la respuesta de la api para el futuro incert 
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
    return data_estructurada

def insert_metricas(valores):
    '''
    ## Inserta metricas en la base de datos
    Dentro de la tabla metricas se hace el insert de los valores obtenidos o generados de forma al azar 
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
    cur.execute('''insert into gaga."METRICAS"
            (id_metrica,fecha,
            temperatura,humedad, viento, 
            litros_consumidos, watt_consumidos, 
            centrales_id_central) 
            values (default, %s, %s, %s, %s, %s, %s, %s);''',insert)
    
    #se confirma los cambios
    conector.commit()

def nueva_empresa(values):
    '''
    ## Inserta una nueva empresa en la base de datos
    Inserta una nueva empresa en la base de datos
    '''
    cur.execute('insert into gaga."EMPRESAS" (email, nombre_empresa, direccion, cuit ) values (%s, %s, %s, %s);', values)
    conector.commit()

# se obtienen los calores de la metrica y se los pasan al insert
if __name__ == "__main__":
    insert_metricas(get_metricas())
    cur.close()
    conector.close()

