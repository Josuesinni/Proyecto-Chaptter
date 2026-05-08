### Pasos para ejecutar el Frontend
# 1. Entrar a la terminal 
# 2. Ir a la carpeta client 
# 3. Usar el comando npm install
# 4. Usar el comando npm run dev para ejecutar la aplicación en modo desarrollador
# 5. Entrar al link localhost:5173

### Pasos para instalar el Backend
# 1. Entrar a la terminal
# 1. Ir a la carpeta server
# 2. Activar el entorno virtual de python usando entrando en la terminal y ejecutar venv\Scripts\activate o source venv\Scripts\activate
# 3. Usar el comando pip install para instalar las librearías necesarias 
# 4. Usar el comando para ejecutar el servidor uvicorn main:app --port 8080 --host localhost --reload


### Base de datos

# La base de datos se encuentra en el archivo microsaas.db, es una base de datos creada con sqlite3

# deactivate para cerrar el entorno virtual

# Para las pruebas del pago en Stripe usar:
# 4242 4242 4242 4242 como tarjeta
# 12/34   como fecha de expiración
# 123 como CVC
# Juan Perez

# Usar stripe
# El proceso fue instalar Stripe CLI desde github
# Despues abrir una terminar y ejecutar stripe login
# Eso envía un link para permitir el acceso a la cuenta de stripe (este es el punto en el que desconozco si funcionará desde otra PC)
# Despues de ejecutar el link stripe listen --forward-to localhost:8080/webhook esto es para poder escuchar el evento checkout.session.completed no encontre otra manera que no implicara usar aws y azure, ya que no cuento con esos servicios
# Esto permite que al servidor escuchar la respuesta de stripe y lo gestiona en la ruta especificada
