import request from 'supertest';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';
import app from '../index.js';
import { User } from '../models/user.model.js';
import { BusinessIdea } from '../models/businessIdea.model.js';

describe('API Endpoints', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Connexion à la base de test
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    
    // Créer un utilisateur de test
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };
    
    const user = await User.create(userData);
    userId = user._id;
    
    // Générer un token de test
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });
    
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await BusinessIdea.deleteMany({});
    await mongoose.connection.close();
  });

  describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          name: 'New User'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'newuser@example.com');
    });

    it('should login existing user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should get user profile', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });
  });

  describe('Business Idea Endpoints', () => {
    let ideaId;

    it('should create a new idea', async () => {
      const res = await request(app)
        .post('/api/ideas')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Idea',
          description: 'Test Description',
          industry: 'Technology'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('title', 'Test Idea');
      ideaId = res.body._id;
    });

    it('should get all ideas', async () => {
      const res = await request(app)
        .get('/api/ideas')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.ideas)).toBeTruthy();
    });

    it('should get idea by id', async () => {
      const res = await request(app)
        .get(`/api/ideas/${ideaId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', ideaId);
    });

    it('should update idea', async () => {
      const res = await request(app)
        .put(`/api/ideas/${ideaId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Updated Title'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('title', 'Updated Title');
    });

    it('should analyze idea', async () => {
      const res = await request(app)
        .post(`/api/ideas/${ideaId}/analyze`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('aiInsights');
    });

    it('should delete idea', async () => {
      const res = await request(app)
        .delete(`/api/ideas/${ideaId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(204);
    });
  });
});
