const request = require('supertest');
const app = require('../index'); // Asegúrate de que la ruta sea correcta
const { sequelize } = require('../base-orm/sequelize-init');

describe('Unit tests for /api/jugadores', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await sequelize.models.jugadores.bulkCreate([
      { Nombre: 'Roger Federer', Nacionalidad: 'Suiza', Ranking: 3, FechaNacimiento: '1981-08-08' },
      { Nombre: 'Rafael Nadal', Nacionalidad: 'España', Ranking: 2, FechaNacimiento: '1986-06-03' },
      { Nombre: 'Novak Djokovic', Nacionalidad: 'Serbia', Ranking: 1, FechaNacimiento: '1987-05-22' },
      { Nombre: 'Andy Murray', Nacionalidad: 'Reino Unido', Ranking: 4, FechaNacimiento: '1987-05-15' },
      { Nombre: 'Stan Wawrinka', Nacionalidad: 'Suiza', Ranking: 5, FechaNacimiento: '1985-03-28' },
      { Nombre: 'Dominic Thiem', Nacionalidad: 'Austria', Ranking: 6, FechaNacimiento: '1993-09-03' },
      { Nombre: 'Alexander Zverev', Nacionalidad: 'Alemania', Ranking: 7, FechaNacimiento: '1997-04-20' },
      { Nombre: 'Stefanos Tsitsipas', Nacionalidad: 'Grecia', Ranking: 8, FechaNacimiento: '1998-08-12' },
      { Nombre: 'Daniil Medvedev', Nacionalidad: 'Rusia', Ranking: 9, FechaNacimiento: '1996-02-11' },
      { Nombre: 'Matteo Berrettini', Nacionalidad: 'Italia', Ranking: 10, FechaNacimiento: '1996-04-12' }
    ]);
  });

  test('GET /api/jugadores - debería devolver todos los jugadores', async () => {
    const res = await request(app).get('/api/jugadores');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/jugadores/:id - debería devolver un jugador', async () => {
    const res = await request(app).get('/api/jugadores/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.Nombre).toBe('Roger Federer');
  });

  test('POST /api/jugadores - debería crear un nuevo jugador', async () => {
    const res = await request(app)
      .post('/api/jugadores')
      .send({ Nombre: 'Carlos Alcaraz', Nacionalidad: 'España', Ranking: 11, FechaNacimiento: '2003-05-05' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.Nombre).toBe('Carlos Alcaraz');
  });

  test('PUT /api/jugadores/:id - debería actualizar un jugador', async () => {
    const res = await request(app)
      .put('/api/jugadores/1')
      .send({ Nombre: 'Roger Federer', Nacionalidad: 'Suiza', Ranking: 1, FechaNacimiento: '1981-08-08' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Jugador actualizado');
  });

  test('DELETE /api/jugadores/:id - debería eliminar un jugador', async () => {
    const res = await request(app).delete('/api/jugadores/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Jugador eliminado');
  });
});
