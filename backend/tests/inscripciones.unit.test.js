const request = require('supertest');
const app = require('../index'); // Asegúrate de que la ruta sea correcta
const { sequelize } = require('../base-orm/sequelize-init');

describe('Unit tests for /api/inscripciones', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.models.inscripciones.bulkCreate([
      { IdJugador: 1, IdTorneo: 1 },
      { IdJugador: 2, IdTorneo: 1 },
      { IdJugador: 3, IdTorneo: 2 },
      { IdJugador: 4, IdTorneo: 3 },
      { IdJugador: 5, IdTorneo: 4 },
      { IdJugador: 6, IdTorneo: 5 },
      { IdJugador: 7, IdTorneo: 6 },
      { IdJugador: 8, IdTorneo: 7 },
      { IdJugador: 9, IdTorneo: 8 },
      { IdJugador: 10, IdTorneo: 9 }
    ]);
  });

  test('GET /api/inscripciones - debería devolver todas las inscripciones', async () => {
    const res = await request(app).get('/api/inscripciones').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/inscripciones/:id - debería devolver una inscripción', async () => {
    const res = await request(app).get('/api/inscripciones/1').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.IdInscripcion).toBe(1);
  });

  test('POST /api/inscripciones - debería crear una nueva inscripción', async () => {
    const res = await request(app)
      .post('/api/inscripciones')
      .set('Authorization', `Bearer ${token}`)
      .send({ IdJugador: 1, IdTorneo: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body.IdJugador).toBe(1);
  });

  test('PUT /api/inscripciones/:id - debería actualizar una inscripción', async () => {
    const res = await request(app)
      .put('/api/inscripciones/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ IdJugador: 2, IdTorneo: 1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Inscripción actualizada');
  });

  test('DELETE /api/inscripciones/:id - debería eliminar una inscripción', async () => {
    const res = await request(app).delete('/api/inscripciones/1').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Inscripción eliminada');
  });
});
