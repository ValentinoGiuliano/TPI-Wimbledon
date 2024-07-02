const request = require('supertest');
const app = require('../index');

describe('Seguridad', () => {
  it('Debería devolver un token de acceso', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ usuario: 'admin', clave: '123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('Debería permitir acceso a ruta protegida con token válido', async () => {
    const loginRes = await request(app)
      .post('/api/login')
      .send({ usuario: 'admin', clave: '123' });
    const token = loginRes.body.accessToken;

    const res = await request(app)
      .get('/api/jugadores')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
