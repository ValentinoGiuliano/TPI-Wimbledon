const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { token } = require('../seguridad/auth');

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log("user:",username,"clave:",password,"token:",token)

  // Validar credenciales (en un entorno real, compararías las credenciales con una base de datos)
  if (username === 'admin' && password === '123') {
    const accessToken = jwt.sign({ username, rol: 'admin' }, token);
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: 'Usuario o clave incorrecta' });
  }
});

module.exports = router;