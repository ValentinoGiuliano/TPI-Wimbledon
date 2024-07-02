const request = require('supertest');
const app = require('../index');

describe('Unit tests for /api/torneos', () => {
    let token;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ usuario: 'admin', clave: '123' });
        token = res.body.accessToken;
    });

    it('GET /api/torneos - debería devolver todos los torneos', async () => {
        const res = await request(app)
            .get('/api/torneos')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /api/torneos/:id - debería devolver un torneo', async () => {
        const res = await request(app)
            .get('/api/torneos/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.Nombre).toBe('Wimbledon 2024');
    });

    it('POST /api/torneos - debería crear un nuevo torneo', async () => {
        const res = await request(app)
            .post('/api/torneos')
            .send({ Nombre: 'US Open 2024', FechaInicio: '2024-08-26', FechaFin: '2024-09-08' })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body.Nombre).toBe('US Open 2024');
    });

    it('PUT /api/torneos/:id - debería actualizar un torneo', async () => {
        const res = await request(app)
            .put('/api/torneos/1')
            .send({ Nombre: 'Wimbledon 2024', FechaInicio: '2024-06-29', FechaFin: '2024-07-12' })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Torneo actualizado');
    });

    it('DELETE /api/torneos/:id - debería eliminar un torneo', async () => {
        const res = await request(app)
            .delete('/api/torneos/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Torneo eliminado');
    });
});
