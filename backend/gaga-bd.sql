-- =================================================================
-- PASO 1: CREACIÓN DEL ESQUEMA Y CONFIGURACIÓN
-- =================================================================

-- Creación del esquema (schema)
CREATE SCHEMA gaga;

-- Configuración de la búsqueda de esquemas para usar el nuevo esquema
SET search_path TO gaga, public;

-- =================================================================
-- PASO 2: CREACIÓN DE TABLAS
-- =================================================================

-- Tabla EMPRESAS (Padre)
-- PK: id_empresa es la clave primaria simple referenciable.
CREATE TABLE "EMPRESAS" (
  id_empresa SERIAL,
  email VARCHAR(160) NOT NULL,
  nombre_empresa VARCHAR(160) NOT NULL,
  direccion VARCHAR(255),
  cuit BIGINT NOT NULL UNIQUE, 
  PRIMARY KEY (id_empresa)
);

-- Tabla USUARIOS (Hija de EMPRESAS)
CREATE TABLE "USUARIOS" (
  id_usuario SERIAL,
  nombre VARCHAR(160),
  apellido VARCHAR(45),
  email VARCHAR(160),
  cuit_empresa BIGINT NOT NULL,
  rol VARCHAR(10) CHECK (rol IN ('admin', 'usuario')),
  contrasenia VARCHAR(16),
  EMPRESAS_id_empresa INT NOT NULL,
  -- Mantenemos la clave primaria compuesta por si la requiere la lógica de negocio
  PRIMARY KEY (id_usuario, EMPRESAS_id_empresa, cuit_empresa), 
  CONSTRAINT fk_USUARIOS_EMPRESAS
    FOREIGN KEY (EMPRESAS_id_empresa)
    REFERENCES "EMPRESAS" (id_empresa) 
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Tabla CENTRALES (Hija de EMPRESAS y Padre de METRICAS)
CREATE TABLE "CENTRALES" (
  id_central SERIAL,
  n_serie BIGINT NOT NULL,
  direccion VARCHAR(160),
  EMPRESAS_id_empresa INT NOT NULL,
  fecha_carga TIMESTAMP,
  PRIMARY KEY (id_central), -- ¡CORREGIDO! id_central es ahora la clave primaria simple
  -- Añadimos una restricción UNIQUE para la combinación original, si es necesario:
  UNIQUE (id_central, EMPRESAS_id_empresa), 
  CONSTRAINT fk_CENTRALES_EMPRESAS1
    FOREIGN KEY (EMPRESAS_id_empresa)
    REFERENCES "EMPRESAS" (id_empresa) 
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Tabla METRICAS (Hija de CENTRALES)
CREATE TABLE "METRICAS" (
  id_metrica SERIAL,
  fecha TIMESTAMP,
  temperatura FLOAT,
  humedad FLOAT,
  viento FLOAT,
  litros_consumidos FLOAT,
  watt_consumidos FLOAT,
  CENTRALES_id_central INT NOT NULL,
  PRIMARY KEY (id_metrica),
  CONSTRAINT fk_REGISTROS_CENTRALES1
    FOREIGN KEY (CENTRALES_id_central)
    REFERENCES "CENTRALES" (id_central) -- Referencia VÁLIDA a la PK simple de "CENTRALES"
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Creacion de una empresa, ya que dependen de esa rama.
insert into gaga."EMPRESAS"(id_empresa, email, nombre_empresa, direccion, cuit) values (default, 'info@samsung.com', 'Samsung','Calle Sin Nombre 1', 30999998882);
insert into gaga."EMPRESAS"(id_empresa, email, nombre_empresa, direccion, cuit) values (default, 'info@lear.com', 'Lear','Calle Sin Nombre 2', 30999997772);
insert into gaga."EMPRESAS"(id_empresa, email, nombre_empresa, direccion, cuit) values (default, 'info@ardu.com', 'Ardun','Calle Sin Nombre 3', 30999999992);

-- creacion del usuario administrador.
insert into gaga."USUARIOS"(id_usuario, nombre, apellido, email, cuit_empresa, rol, contrasenia, empresas_id_empresa) values (default, 'admin', 'admin','admin@admin.com', 30999999992, 'admin', 'admin', 1);

-- creacion de usuario random
insert into gaga."USUARIOS"(id_usuario, nombre, apellido, email, cuit_empresa, rol, contrasenia, empresas_id_empresa) values (default, 'JUAN', 'Martinez','jmartinez@gmail.com', 30999999992, 'usuario', 'JMartin12!', 1);

-- Creacion de datos de centrales.
insert into gaga."CENTRALES" (id_central, n_serie, direccion, empresas_id_empresa, fecha_carga) values (default, 000003, 'Calle siempre viva 1234', 1, '2000-01-01 00:00:00');
insert into gaga."CENTRALES" (id_central, n_serie, direccion, empresas_id_empresa, fecha_carga) values (default, 000002, 'Calle siempre viva 1235', 1, '2000-01-01 00:00:00');
insert into gaga."CENTRALES" (id_central, n_serie, direccion, empresas_id_empresa, fecha_carga) values (default, 000003, 'Calle siempre viva 1236', 1, '2000-01-01 00:00:00');


-- INSER DE METRICAS
INSERT INTO gaga."METRICAS" (id_metrica, fecha, temperatura, humedad, viento, litros_consumidos, watt_consumidos, centrales_id_central) 
VALUES (default, '2025-10-15 21:00:00', 18.5, 65, 3.1, 2650, 7800, 1);

INSERT INTO gaga."METRICAS" (id_metrica, fecha, temperatura, humedad, viento, litros_consumidos, watt_consumidos, centrales_id_central) 
VALUES (default, '2025-10-15 21:01:00', 18.4, 66, 3.0, 2890, 5100, 2);

INSERT INTO gaga."METRICAS" (id_metrica, fecha, temperatura, humedad, viento, litros_consumidos, watt_consumidos, centrales_id_central) 
VALUES (default, '2025-10-15 21:02:00', 18.4, 66, 3.2, 2510, 9500, 1);

INSERT INTO gaga."METRICAS" (id_metrica, fecha, temperatura, humedad, viento, litros_consumidos, watt_consumidos, centrales_id_central) 
VALUES (default, '2025-10-15 21:03:00', 18.3, 67, 2.9, 2995, 6250, 2);

INSERT INTO gaga."METRICAS" (id_metrica, fecha, temperatura, humedad, viento, litros_consumidos, watt_consumidos, centrales_id_central) 
VALUES (default, '2025-10-15 21:04:00', 18.2, 68, 2.8, 2750, 8880, 1);





