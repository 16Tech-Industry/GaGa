# 🌍 GaGa – Gestión Avanzada de la Green Analytics

## 🧾 Descripción
GaGa es un sistema para la recopilacio, organizacion y analisis de datos ambientales de forma continua y automatizada con una finalidad ecológica. Involucra el monitoreo del consumo energético, el cálculo del ahorro, la evaluación de variaciones de temperatura y la generación de insights para tomar decisiones sostenibles.

## 🚀 Funcionalidades
- Registro e inicio de sesión de usuarios
- Visualización de datos ambientales
- Alertas por desviaciones en métricas configurables
- Dashboard personalizable

## 🎯 Público Objetivo
Los usuarios del sistema estarán conformados por:
- Usuarios finales: empleados de las empresas del parque industrial que consultan los datos.
- Empresas: interesadas en monitorear condiciones ambientales.
- Gobiernos y entes reguladores: que usan esta información para diseñar políticas públicas.

## 🛠️ Tecnologías Utilizadas
 
| Logo | Tecnología |
|:----:|------------|
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="30"/> | HTML |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="30"/> | CSS |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" width="30"/> | Bootstrap |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/angular/angular-original.svg" width="30"/> | Angular |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="30"/> | TypeScript |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" width="30"/> | Python |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg" width="30"/> | Django |
| <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="30"/> | GitHub |
| <img src="https://www.w3.org/html/logo/downloads/HTML5_Logo.svg" width="30"/> | W3C Validator |
| ⚡ | MQTT |
| 📡 | WiFi / Internet |
| 🖥️ | ESP32 y sensores |

## 👨‍💻 Equipo
- Bustos Bautista 
- Coraspe Bueno Heyme
- Cañas Luciano Adolfo
- Ávila Franco
- Giraudo Guillermo
- Juárez Valentín

Entre sus Funcionalidades encontramos:
- Recolección automática de datos desde sensores o fuentes externas (API).
- Almacenamiento estructurado de la información recolectada.
- Procesamiento de los datos y cálculo de métricas.
- Visualización en un tablero de control (dashboard) con gráficos interactivos.

Tecnologias utilizadas:
- Lenguajes de programacion (HTML, CSS, JS, TypeScript, Python);
- Frameworks (Bootstrap, Angular, Django);
- Protocolos de envios de informacion (MQTT);
- Hardware (Microprocesador ESP32, Sensores)
- Redes (WIFI, Internet)

## 🛠️ Flujo de trabajo
¿Cómo registrar usuario y acceder al dashboard de usuario?<br>
Registro del usuario<br>
Dirígete a la página de registro (registrarse) y completa el formulario con los datos del usuario.<br>
De allí será dirigido al inicio de sesión e ingresa con mail y contraseña registrados.<br>
Una vez iniciada la sesión serás dirigido al dashboard de usuarios, donde puedes ver las métricas de consumo y el historial de humedad, temperatura, consumo energético y consumo energético ahorro. Dichos gráficos para visualizar su contenido se debe hacer clic sobre el color 2 veces para que refresque la búsqueda en la api y los complete.
<br>
usuario: jmartinez@gmail.com<br>
contraseña: JMartin12!<br>

¿Cómo ingresar con usuario administrador y acceder al dashboard de administrador?<br>
Inicio de sesión como administrador<br>
Ve a la página de login (/login)), ingresa las credenciales del usuario administrador y accede.<br>

usuario: admin@admin.com<br>
contraseña: admin<br>


Acceso al dashboard de administrador<br>
Una vez autenticado como administrador, serás redirigido al dashboard de administrador (/dash-admin). Desde allí podrás gestionar usuarios y centrales, creación, edición y borrado de perfiles.<br>

Reemplaza contraseña Django settings:<br>
Modificar contraseña de base de datos en archivo gaga/settings.py<br>
