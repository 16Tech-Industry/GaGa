import psycopg2

conector =psycopg2.connect(
            host="localhost",
            database="postgres",
            user="postgres",
            password="admin",
            port="5432"
        )
cur = conector.cursor()
cur.execute(f"SET search_path TO gaga, public;")

cur.execute('insert into gaga."EMPRESAS" (email, nombre_empresa, direccion, cuit ) values (%s, %s, %s, %s);',
            ("Empresa@empresa","lamus mu", "Calle Falsa 123", "5551234"))

cur.execute('SELECT * FROM gaga."EMPRESAS";')
rows = cur.fetchall()

print(rows)


cur.close()
conector.close()