const express = require('express');
const router = express.Router();
const { Inscripcion, Jugador, Torneo } = require('../base-orm/sequelize-init');

router.get('/', async (req, res) => {
  const inscripciones = await Inscripcion.findAll({
    include: [
      { model: Jugador, attributes: ['Nombre'] },
      { model: Torneo, attributes: ['Nombre'] }
    ]
  });
  res.json(inscripciones);
});

router.get('/:id', async (req, res) => {
  const inscripcion = await Inscripcion.findByPk(req.params.id);
  res.json(inscripcion);
});

router.post('/', async (req, res) => {
  const inscripcion = await Inscripcion.create(req.body);
  res.status(201).json(inscripcion);
});

router.put('/:id', async (req, res) => {
  await Inscripcion.update(req.body, { where: { IdInscripcion: req.params.id } });
  res.json({ message: 'Inscripción actualizada' });
});

router.delete('/:id', async (req, res) => {
  await Inscripcion.destroy({ where: { IdInscripcion: req.params.id } });
  res.json({ message: 'Inscripción eliminada' });
});

module.exports = router;
