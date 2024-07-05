const request = require('supertest');
const app = require('../index'); // Asegúrate de que la ruta sea correcta
const { sequelize } = require('../base-orm/sequelize-init');

describe('Unit tests for /api/torneos', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.models.torneos.bulkCreate([
      { Nombre: 'Wimbledon 2024', FechaInicio: '2024-06-28', FechaFin: '2024-07-11' },
      { Nombre: 'Wimbledon 2023', FechaInicio: '2023-06-28', FechaFin: '2023-07-11' },
      { Nombre: 'US Open 2024', FechaInicio: '2024-08-26', FechaFin: '2024-09-08' },
      { Nombre: 'French Open 2024', FechaInicio: '2024-05-22', FechaFin: '2024-06-05' },
      { Nombre: 'Australian Open 2024', FechaInicio: '2024-01-15', FechaFin: '2024-01-28' },
      { Nombre: 'Wimbledon 2024 Femenino', FechaInicio: '2024-06-28', FechaFin: '2024-07-11' },
      { Nombre: 'US Open 2024 Femenino', FechaInicio: '2024-08-26', FechaFin: '2024-09-08' },
      { Nombre: 'French Open 2024 Femenino', FechaInicio: '2024-05-22', FechaFin: '2024-06-05' },
      { Nombre: 'Australian Open 2024 Femenino', FechaInicio: '2024-01-15', FechaFin: '2024-01-28' },
      { Nombre: 'Wimbledon 2024 Juniors', FechaInicio: '2024-06-28', FechaFin: '2024-07-11' }
    ]);
  });

  test('GET /api/torneos - debería devolver todos los torneos', async () => {
    const res = await request(app).get('/api/torneos').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/torneos/:id - debería devolver un torneo', async () => {
    const res = await request(app).get('/api/torneos/1').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.Nombre).toBe('Wimbledon 2024');
  });

  test('POST /api/torneos - debería crear un nuevo torneo', async () => {
    const res = await request(app)
      .post('/api/torneos')
      .set('Authorization', `Bearer ${token}`)
      .send({ Nombre: 'US Open 2025', FechaInicio: '2025-08-26', FechaFin: '2025-09-08' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.Nombre).toBe('US Open 2025');
  });

  test('PUT /api/torneos/:id - debería actualizar un torneo', async () => {
    const res = await request(app)
      .put('/api/torneos/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ Nombre: 'Wimbledon 2024', FechaInicio: '2024-06-29', FechaFin: '2024-07-12' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Torneo actualizado');
  });

  test('DELETE /api/torneos/:id - debería eliminar un torneo', async () => {
    const res = await request(app).delete('/api/torneos/1').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Torneo eliminado');
  });
});
