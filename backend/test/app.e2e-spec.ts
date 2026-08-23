import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '../src/app.module';

describe('Tasks API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /tasks returns tasks', async () => {
    await request(app.getHttpServer()).get('/tasks').expect(200);
  });

  it('GET /tasks/:id returns a task', async () => {
    await request(app.getHttpServer())
      .get('/tasks/3')
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: 3,
            priority: 'High',
            status: 'Todo',
            dueDate: '2026-09-12',
          }),
        );
      });
  });

  it('GET /tasks/:id returns 404 for a missing task', async () => {
    await request(app.getHttpServer()).get('/tasks/999999').expect(404);
  });

  it('POST /tasks rejects invalid data', async () => {
    await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: '',
        priority: 'Invalid',
        status: 'Invalid',
        dueDate: 'not-a-date',
      })
      .expect(400);
  });
});
