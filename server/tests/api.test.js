import request from 'supertest';
import { app, serverGlobal } from '../server.mjs';

afterAll(() => {
    if (serverGlobal) serverGlobal.close();
});

test('GET property/ should return 200', async () => {
    const res = await request(app).get('/property/');
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
});