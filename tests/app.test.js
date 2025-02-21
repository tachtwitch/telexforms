import request from 'supertest';
import app  from '../api';

describe('GET /integration.json', () => {
  it('should return integration data', async () => {
    const response = await request(app).get('/integration.json');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
});

describe('PUT /', () => {
  it('should return 405', async () => {
    const response = await request(app).put('/');
    expect(response.status).toBe(405);
    expect(response.type).toBe('application/json');
  });
});


describe('GET /', () => {
  it('should return Home', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
  });
});


describe('POST /submit-form', (req) => {
  it('should return a 200 response for valid requests', async () => {
    const formData = {
      Title: 'Test Title',
      username: 'testuser',
    };
    const response = await request(app).post('/submit-form').send(formData);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
});