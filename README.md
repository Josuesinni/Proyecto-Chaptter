### Requisitos
# Tener instalado Node
# Tener instalado Python
# Nota: CLI de Stripe ya viene dentro de los archivos

### Pasos para ejecutar el Frontend
# 1. Entrar a la terminal 
# 2. Ir a la carpeta client
# 3. Usar el comando npm install
# 4. Usar el comando npm run dev para ejecutar la aplicación en modo desarrollador
# 5. Entrar al link http://localhost:5173

### Pasos para instalar el Backend
# 1. Entrar a la terminal
# 1. Ir a la carpeta server
# 2. Crear el entorno virtual python -m venv venv
# 2. Activar el entorno virtual de python usando entrando en la terminal y ejecutar venv\Scripts\activate o source venv\Scripts\activate
# 3. Usar el comando pip install -r requirements.txt para instalar las librearías necesarias 
# 4. Usar el comando para ejecutar el servidor uvicorn main:app --port 8080 --host localhost --reload

### Pasos para escuchar los eventos de Stripe
# Entrar en la terminal y escribir stripe login --interactive
# Esto solicitara una API_KEY copiar y pegar sk_test_51TRL4v8qFgrgXiMdq5hbxUBa2MAHBQ3UWqBhsCpMOgNH8NrRxVooz4jqaV4Xe0j4fRWzejgMJGChLGr7Mq93Ff9e006WIjeTpX
# Le pedira que confirme la identidad del dispositivo y de enter
# Despues ejecutar el siguiente comando stripe listen --forward-to localhost:8080/webhook esto creara una clave secreta para el weebhook
# Esa clave ya se encuentra en el archivo .env con la variable STRIPE_WEBHOOK_SECRET
# Se debera dejar en 2do plano la terminal

### Para las pruebas del pago en Stripe usar:
# 4242 4242 4242 4242 como tarjeta
# 12/34   como fecha de expiración
# 123 como CVC
# Juan Perez

### Base de datos

# La base de datos se encuentra en el archivo microsaas.db
# es una base de datos creada con sqlite3
