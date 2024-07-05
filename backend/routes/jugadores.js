const express = require('express');
const router = express.Router();
const { Jugador } = require('../base-orm/sequelize-init');
const { Op } = require('sequelize'); // Importar Op

router.get('/', async (req, res) => {
  const { search, page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;

  const whereClause = search ? { Nombre: { [Op.like]: `%${search}%` } } : {};

  const { count, rows } = await Jugador.findAndCountAll({
    where: whereClause,
    offset: (pageNumber - 1) * pageSize,
    limit: pageSize,
  });

  res.json({
    total: count,
    pages: Math.ceil(count / pageSize),
    currentPage: pageNumber,
    data: rows,
  });
});

router.get('/:id', async (req, res) => {
  const jugador = await Jugador.findByPk(req.params.id);
  if (jugador) {
    res.json(jugador);
  } else {
    res.status(404).json({ error: 'Jugador no encontrado' });
  }
});

router.post('/', async (req, res) => {
  const { Nombre, Nacionalidad, Ranking, FechaNacimiento } = req.body;

  // Verificar si ya existe un jugador con el mismo nombre y ranking
  const jugadorExistente = await Jugador.findOne({ where: { Nombre, Ranking } });
  if (jugadorExistente) {
    return res.status(400).json({ error: 'Ya existe un jugador con este nombre y ranking' });
  }

  const nuevoJugador = await Jugador.create({ Nombre, Nacionalidad, Ranking, FechaNacimiento });
  res.status(201).json(nuevoJugador);
});

router.put('/:id', async (req, res) => {
  const { Nombre, Nacionalidad, Ranking, FechaNacimiento } = req.body;
  const jugador = await Jugador.findByPk(req.params.id);
  if (jugador) {
    await jugador.update({ Nombre, Nacionalidad, Ranking, FechaNacimiento });
    res.json({ message: 'Jugador actualizado' });
  } else {
    res.status(404).json({ error: 'Jugador no encontrado' });
  }
});

router.delete('/:id', async (req, res) => {
  const jugador = await Jugador.findByPk(req.params.id);
  if (jugador) {
    await jugador.destroy();
    res.json({ message: 'Jugador eliminado' });
  } else {
    res.status(404).json({ error: 'Jugador no encontrado' });
  }
});

module.exports = router;
