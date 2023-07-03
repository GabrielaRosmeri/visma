# Repositorio Visma

Este repositorio contiene una carpeta llamada "backend" con Laravel 10 y otra carpeta llamada "frontend" con React 18.

## Configuración del Backend

Asegúrate de tener Laravel 10 instalado en tu sistema. Luego, ejecuta los siguientes comandos:

```bash
# Clonar el repositorio
git clone https://github.com/GabrielaRosmeri/visma.git

# Navegar a la carpeta "backend"
cd visma/backend

# Instalar las dependencias de Laravel
composer install

# Crear el archivo .env
cp .env.example .env

# Configurar las variables de entorno en el archivo .env

# Ejecutar migraciones y seeders
php artisan migrate --seed

# Iniciar el servidor de Laravel
php artisan serve
```
El backend estará disponible en la URL http://localhost:8000/.

# Configuración del Frontend
Asegúrate de tener React 18 instalado en tu sistema. Luego, ejecuta los siguientes comandos:

```bash
# Navegar a la carpeta "frontend"
cd visma/frontend

# Instalar las dependencias de React
npm install

# Crear el archivo .env en la raíz de la carpeta "frontend"
echo "REACT_APP_API_URL=http://localhost:8000/" > .env

# Iniciar la aplicación de React
npm start
```
El frontend estará disponible en la URL http://localhost:3000/. Asegúrate de reemplazar la URL http://localhost:8000/ en el archivo .env con la URL correcta de tu backend si es diferente.

¡Eso es todo! Ahora deberías tener el backend con Laravel 10 ejecutándose en http://localhost:8000/ y el frontend con React 18 ejecutándose en http://localhost:3000/.