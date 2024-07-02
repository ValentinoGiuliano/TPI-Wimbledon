const express = require('express');
const router = express.Router();
const { Jugador } = require('../base-orm/sequelize-init');

router.get('/', async (req, res) => {
  const jugadores = await Jugador.findAll();
  res.json(jugadores);
});

router.get('/:id', async (req, res) => {
  const jugador = await Jugador.findByPk(req.params.id);
  res.json(jugador);
});

router.post('/', async (req, res) => {
  const jugador = await Jugador.create(req.body);
  res.status(201).json(jugador);
});

router.put('/:id', async (req, res) => {
  await Jugador.update(req.body, { where: { IdJugador: req.params.id } });
  res.json({ message: 'Jugador actualizado' });
});

router.delete('/:id', async (req, res) => {
  await Jugador.destroy({ where: { IdJugador: req.params.id } });
  res.json({ message: 'Jugador eliminado' });
});

module.exports = router;
