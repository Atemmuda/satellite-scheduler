const app = require('../../app');
const supertest = require('supertest');

describe('testing for the planet endpoint', () => {
    test('GET /planets, 200 success', async () => {
        const reponse = await supertest(app)
            .get('/planets')
            .expect('Content-Type', /json/)
            .expect(200);
    });
})
