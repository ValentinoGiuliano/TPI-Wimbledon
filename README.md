

---

# TPI Wimbledon 2024

Este es el proyecto integrador para la materia Desarrollo de Software I, donde se implementó un backend con Node.js, Express, Sequelize y SQLite, y un frontend con React y Vite. La aplicación es una gestión de torneos y jugadores de Wimbledon con autenticación JWT.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Instalación

### Backend

1. Clona el repositorio:

   ```bash
   git clone https://labsys.frc.utn.edu.ar/gitlab/desarrollo-de-software1/proyectos2024/3k3/tpi_94819_99700.git
   ```

2. Navega al directorio del backend:

   ```bash
   cd backend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

### Frontend

1. Navega al directorio del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Uso

1. Abre tu navegador y navega a `http://localhost:5173` para acceder al frontend.
2. Usa las credenciales por defecto para iniciar sesión:
   - Usuario: `admin`
   - Contraseña: `123`
3. Una vez autenticado, puedes acceder a las funcionalidades de CRUD para jugadores y torneos, así como gestionar inscripciones.

## Endpoints

### Autenticación

- `POST /login`: Iniciar sesión.

### Jugadores

- `GET /api/jugadores`: Obtener todos los jugadores.
- `GET /api/jugadores/:id`: Obtener un jugador por ID.
- `POST /api/jugadores`: Crear un nuevo jugador.
- `PUT /api/jugadores/:id`: Actualizar un jugador.
- `DELETE /api/jugadores/:id`: Eliminar un jugador.

### Torneos

- `GET /api/torneos`: Obtener todos los torneos.
- `GET /api/torneos/:id`: Obtener un torneo por ID.
- `POST /api/torneos`: Crear un nuevo torneo.
- `PUT /api/torneos/:id`: Actualizar un torneo.
- `DELETE /api/torneos/:id`: Eliminar un torneo.

### Inscripciones

- `GET /api/inscripciones`: Obtener todas las inscripciones.
- `GET /api/inscripciones/:id`: Obtener una inscripción por ID.
- `POST /api/inscripciones`: Crear una nueva inscripción.
- `PUT /api/inscripciones/:id`: Actualizar una inscripción.
- `DELETE /api/inscripciones/:id`: Eliminar una inscripción.

## Tecnologías

- Backend: Node.js, Express, Sequelize, SQLite, JWT
- Frontend: React, Vite, Axios, Bootstrap

## Estructura del Proyecto

### Backend

- `/base-orm`: Configuración de Sequelize y modelos.
- `/routes`: Rutas de la API.
- `/seguridad`: Middleware de autenticación.
- `index.js`: Punto de entrada de la aplicación.
- `sqlite-init.js`: Inicialización de la base de datos SQLite.

### Frontend

- `/src`: Código fuente del frontend.
  - `/components`: Componentes reutilizables.
  - `/pages`: Páginas principales de la aplicación.
  - `App.js`: Componente principal de la aplicación.
  - `main.jsx`: Punto de entrada de la aplicación.


