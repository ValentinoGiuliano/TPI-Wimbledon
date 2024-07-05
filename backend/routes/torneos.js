const express = require('express');
const router = express.Router();
const { Torneo } = require('../base-orm/sequelize-init');

router.get('/', async (req, res) => {
  const torneos = await Torneo.findAll();
  res.json(torneos);
});

router.get('/:id', async (req, res) => {
  const torneo = await Torneo.findByPk(req.params.id);
  res.json(torneo);
});

router.post('/', async (req, res) => {
  const torneo = await Torneo.create(req.body);
  res.status(201).json(torneo);
});

router.put('/:id', async (req, res) => {
  await Torneo.update(req.body, { where: { IdTorneo: req.params.id } });
  res.json({ message: 'Torneo actualizado' });
});

router.delete('/:id', async (req, res) => {
  await Torneo.destroy({ where: { IdTorneo: req.params.id } });
  res.json({ message: 'Torneo eliminado' });
});

module.exports = router;
