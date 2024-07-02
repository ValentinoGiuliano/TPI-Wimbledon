const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { accessTokenSecret } = require('../seguridad/auth');

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { usuario, clave } = req.body;

  // Validar credenciales (en un entorno real, compararías las credenciales con una base de datos)
  if (usuario === 'admin' && clave === '123') {
    const accessToken = jwt.sign({ usuario, rol: 'admin' }, accessTokenSecret);
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: 'Usuario o clave incorrecta' });
  }
});

module.exports = router;