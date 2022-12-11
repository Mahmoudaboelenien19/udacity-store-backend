import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('End Point testing', () => {
  it('test app', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
  });
});
