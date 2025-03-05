// import request from 'supertest';
// import { app, serverGlobal, startServer } from '../server.mjs';

// beforeAll(async () => {
//     process.env.PORT = 5001;
//     await startServer();
// });

// afterAll(() => {
//     if (serverGlobal) serverGlobal.close();
// });

// test('GET /property/ should return 200', async () => {
//     const res = await request(app).get('/property/');
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toBeDefined();
// });