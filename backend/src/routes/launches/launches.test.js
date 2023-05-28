const { response } = require('express');
const app = require('../../app');
const supertest = require('supertest');

// Testing for the get launches endpoint of the launches collection
describe('Test GET /launches', () => {
    test('correct reponse code, 200 success', async () => {
        const response = await supertest(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

const completeLaunchData = {
    mission: 'Yaw explore',
    rocket: 'Eplorer IS1',
    target: 'Keepler-42 b',
    launchDate: 'August 27, 2029',
}

//to test for when user pass in no date
const launchDataWithoutDate = {
    mission: 'Yaw explore',
    rocket: 'Eplorer IS1',
    target: 'Keepler-42 b',
}

//to test for when user pass in wrong date
const launchDatawWithIncorrectDate = {
    mission: 'Yaw explore',
    rocket: 'Eplorer IS1',
    target: 'Keepler-42 b',
    launchDate: 'hello',
}

//testing for the post launches endpoint of the launches collection
describe('Test POST /launches', () => {
    test('correct reponse code, 201 created', async () => {
        const response = await supertest(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const responseDate  = new Date(response.body.launchDate).valueOf();
        const requestDate = new Date(completeLaunchData.launchDate).valueOf();

        expect(requestDate).toBe(responseDate)
        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    // testing for when no date is passed during a launch
    test('missing required feilds', async () => {
        const response = await supertest(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body).toStrictEqual({
            error: "missing launch data field"
        });
    });

    //testing for when wrong date is passed during a launch 
    test('invalid date passed', async () => {
        const response = await supertest(app)
            .post('/launches')
            .send(launchDatawWithIncorrectDate)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body).toStrictEqual({
            error: "incorrect date"
        });
    });
});
