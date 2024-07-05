const express = require('express');
const { sequelize } = require('./base-orm/sequelize-init');
const cors = require('cors');
const { authenticateJWT } = require('./seguridad/auth');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// Inicializar la base de datos si no existe
require('./base-orm/sqlite-init');

// Rutas
const jugadoresRouter = require('./routes/jugadores');
const torneosRouter = require('./routes/torneos');
const seguridadRouter = require('./routes/seguridad');
const inscripcionesRouter = require('./routes/inscripciones');

// Configurar las rutas
app.use('/api/jugadores', jugadoresRouter); // Sin autenticación
app.use('/api/torneos', authenticateJWT, torneosRouter); // Con autenticación
app.use('/api/inscripciones', authenticateJWT, inscripcionesRouter); // Con autenticación
app.use(seguridadRouter); // Rutas de seguridad (login)

// Ruta principal para verificar funcionamiento
app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

// Ruta _isalive para verificar estado
app.get("/_isalive", (req, res) => {
  res.send(`Ejecutándose desde: ${app.locals.fechaInicio}`);
});

if (!module.parent) {
  const port = process.env.PORT || 3000;
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app;
