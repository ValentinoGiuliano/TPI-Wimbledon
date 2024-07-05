const express = require('express');
const router = express.Router();
const { Inscripcion, Jugador, Torneo } = require('../base-orm/sequelize-init');

router.get('/', async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll({
      include: [
        { model: Jugador, attributes: ['Nombre'] },
        { model: Torneo, attributes: ['Nombre'] }
      ]
    });
    console.log('Inscripciones:', inscripciones);
    res.json(inscripciones);
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    res.status(500).json({ error: 'Error al obtener inscripciones' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByPk(req.params.id, {
      include: [
        { model: Jugador, attributes: ['Nombre'] },
        { model: Torneo, attributes: ['Nombre'] }
      ]
    });
    res.json(inscripcion);
  } catch (error) {
    console.error('Error al obtener la inscripción:', error);
    res.status(500).json({ error: 'Error al obtener la inscripción' });
  }
});

router.post('/', async (req, res) => {
  const { IdJugador, IdTorneo } = req.body;
  try {
    // Verificar si la inscripción ya existe
    const existingInscripcion = await Inscripcion.findOne({
      where: { IdJugador, IdTorneo }
    });
    if (existingInscripcion) {
      return res.status(400).json({ error: 'La inscripción ya existe' });
    }
    const inscripcion = await Inscripcion.create(req.body);
    res.status(201).json(inscripcion);
  } catch (error) {
    console.error('Error al crear la inscripción:', error);
    res.status(500).json({ error: 'Error al crear la inscripción' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Inscripcion.update(req.body, { where: { IdInscripcion: req.params.id } });
    res.json({ message: 'Inscripción actualizada' });
  } catch (error) {
    console.error('Error al actualizar la inscripción:', error);
    res.status(500).json({ error: 'Error al actualizar la inscripción' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Inscripcion.destroy({ where: { IdInscripcion: req.params.id } });
    res.json({ message: 'Inscripción eliminada' });
  } catch (error) {
    console.error('Error al eliminar la inscripción:', error);
    res.status(500).json({ error: 'Error al eliminar la inscripción' });
  }
});

module.exports = router;
