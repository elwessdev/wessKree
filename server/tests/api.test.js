import request from 'supertest';
import { app, startServer } from '../server.mjs';

let serverGlobal;

beforeAll(async () => {
    serverGlobal = await startServer();
});

afterAll(() => {
    if (serverGlobal) serverGlobal.close();
});

test('GET property/ should return 200', async () => {
    const res = await request(app).get('/property/');
    // console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
});