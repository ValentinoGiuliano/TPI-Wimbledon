const request = require('supertest');
const app = require('../index'); // Asegúrate de que la ruta sea correcta
const { sequelize } = require('../base-orm/sequelize-init');

describe('Seguridad', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.models.usuarios.bulkCreate([
      { Nombre: 'admin', Clave: '123', Rol: 'admin' },
      { Nombre: 'user', Clave: '123', Rol: 'user' }
    ]);
  });

  test('Debería permitir acceso a ruta protegida con token válido', async () => {
    const loginResponse = await request(app)
      .post('/api/login')
      .send({ usuario: 'admin', clave: '123' });

    expect(loginResponse.statusCode).toEqual(200);
    const token = loginResponse.body.accessToken;
    expect(token).toBeDefined();

    const res = await request(app)
      .get('/api/torneos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });

  test('Debería denegar acceso a ruta protegida sin token', async () => {
    const res = await request(app).get('/api/torneos');
    expect(res.statusCode).toEqual(403);
  });
});
