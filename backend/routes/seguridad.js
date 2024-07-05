const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Usuario } = require('../base-orm/sequelize-init');
const { accessTokenSecret } = require('../seguridad/auth');

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const user = await Usuario.findOne({ where: { Nombre: usuario, Clave: clave } });
    if (user) {
      const accessToken = jwt.sign({ usuario }, accessTokenSecret);
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: 'Usuario o clave incorrecta' });
    }
  } catch (error) {
    console.error('Error en el servidor (login): ', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta de registro
router.post('/register', async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const existingUser = await Usuario.findOne({ where: { Nombre: usuario } });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const newUser = await Usuario.create({ Nombre: usuario, Clave: clave });
    const accessToken = jwt.sign({ usuario: newUser.Nombre }, accessTokenSecret);
    res.status(201).json({ accessToken });
  } catch (error) {
    console.error('Error en el servidor (register): ', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

module.exports = router;
