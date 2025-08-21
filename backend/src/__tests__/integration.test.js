import request from 'supertest';
import { app } from '../index.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

describe('Integration Routes', () => {
  let token;
  let userId;

  beforeEach(async () => {
    // Créer un utilisateur de test
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123'
    });
    userId = user._id;
    token = jwt.sign({ userId }, process.env.JWT_SECRET);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /api/integrations', () => {
    it('should return user integrations', async () => {
      const res = await request(app)
        .get('/api/integrations')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('google');
      expect(res.body).toHaveProperty('notion');
      expect(res.body).toHaveProperty('slack');
    });

    it('should return 401 without token', async () => {
      const res = await request(app)
        .get('/api/integrations');

      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/integrations/:service/callback', () => {
    it('should handle Google callback', async () => {
      const res = await request(app)
        .post('/api/integrations/google/callback')
        .set('Authorization', `Bearer ${token}`)
        .send({ code: 'test_code' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should handle Notion callback', async () => {
      const res = await request(app)
        .post('/api/integrations/notion/callback')
        .set('Authorization', `Bearer ${token}`)
        .send({ code: 'test_code' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should handle Slack callback', async () => {
      const res = await request(app)
        .post('/api/integrations/slack/callback')
        .set('Authorization', `Bearer ${token}`)
        .send({ code: 'test_code' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('DELETE /api/integrations/:service', () => {
    it('should remove integration', async () => {
      // D'abord ajouter une intégration
      await User.findByIdAndUpdate(userId, {
        'integrations.google': {
          accessToken: 'test_token',
          refreshToken: 'refresh_token',
          calendarEnabled: true
        }
      });

      const res = await request(app)
        .delete('/api/integrations/google')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Vérifier que l'intégration a été supprimée
      const user = await User.findById(userId);
      expect(user.integrations.google).toEqual({});
    });
  });

  describe('POST /api/integrations/webhooks/:service', () => {
    it('should handle Notion webhook', async () => {
      const res = await request(app)
        .post('/api/integrations/webhooks/notion')
        .set('x-notion-signature', 'valid_signature')
        .send({
          type: 'page_created',
          userId: 'test_user',
          pageId: 'test_page'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should handle Slack webhook challenge', async () => {
      const res = await request(app)
        .post('/api/integrations/webhooks/slack')
        .set('x-slack-signature', 'valid_signature')
        .set('x-slack-request-timestamp', Date.now())
        .send({
          type: 'url_verification',
          challenge: 'test_challenge'
        });

      expect(res.status).toBe(200);
      expect(res.body.challenge).toBe('test_challenge');
    });

    it('should handle Slack webhook event', async () => {
      const res = await request(app)
        .post('/api/integrations/webhooks/slack')
        .set('x-slack-signature', 'valid_signature')
        .set('x-slack-request-timestamp', Date.now())
        .send({
          type: 'event_callback',
          event: {
            type: 'message',
            text: 'Hello'
          }
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
