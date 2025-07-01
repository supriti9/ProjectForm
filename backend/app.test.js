const request = require('supertest');
const app = require('./app');

describe('Test get api for /api/apod',() => {
it('data for selected date',async()=>{
 const response = await request(app).get('/api/apod').query({date: '2023-01-01'});
 expect(response.statusCode).toBe(200);
 expect(response.body).toHaveProperty('url');
 expect(response.body).toHaveProperty('title');

});
});

describe('Test get api for /api/neo',() => {
    it('data for respective dates',async()=>{
     const response = await request(app).get('/api/neo').query({start_date: '2023-01-01',end_date: '2023-01-07'});
     expect(response.statusCode).toBe(200);
     expect(response.body).toHaveProperty('near_earth_objects');
    
    });
});