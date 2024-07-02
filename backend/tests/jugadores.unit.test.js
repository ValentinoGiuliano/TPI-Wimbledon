const request = require('supertest');
const app = require('../index');

describe('Unit tests for /api/jugadores', () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ usuario: 'admin', clave: '123' });
        token = res.body.accessToken;
    });

    it('GET /api/jugadores - debería devolver todos los jugadores', async () => {
        const res = await request(app)
            .get('/api/jugadores')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /api/jugadores/:id - debería devolver un jugador', async () => {
        const res = await request(app)
            .get('/api/jugadores/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.Nombre).toBe('Roger Federer');
    });

    it('POST /api/jugadores - debería crear un nuevo jugador', async () => {
        const res = await request(app)
            .post('/api/jugadores')
            .send({ Nombre: 'Novak Djokovic', Nacionalidad: 'Serbia', Ranking: 1, FechaNacimiento: '1987-05-22' })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body.Nombre).toBe('Novak Djokovic');
    });

    it('PUT /api/jugadores/:id - debería actualizar un jugador', async () => {
        const res = await request(app)
            .put('/api/jugadores/1')
            .send({ Nombre: 'Roger Federer', Nacionalidad: 'Suiza', Ranking: 1, FechaNacimiento: '1981-08-08' })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Jugador actualizado');
    });

    it('DELETE /api/jugadores/:id - debería eliminar un jugador', async () => {
        const res = await request(app)
            .delete('/api/jugadores/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Jugador eliminado');
    });
});
