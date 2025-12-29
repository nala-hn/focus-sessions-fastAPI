
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { expect } from '@jest/globals';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Register a test user before running the tests
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ username: 'testuser', email: 'testuser@example.com', password: 'password' });
  });

  it('/auth/token (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/auth/token')
      .send({ username: 'testuser', password: 'password' })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('token_type', 'bearer');
      });
  });

  it('/auth/token (POST) - failure', () => {
    return request(app.getHttpServer())
      .post('/auth/token')
      .send({ username: 'testuser', password: 'wrongpassword' })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});

