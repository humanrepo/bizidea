import express from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import * as userController from '../controllers/user.controller.js';
import * as ideaController from '../controllers/idea.controller.js';
import * as integrationController from '../controllers/integration.controller.js';
import * as aiController from '../controllers/ai.controller.js';

const router = express.Router();

// Routes d'authentification
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.get('/auth/me', auth, userController.getProfile);
router.post('/auth/google', userController.googleAuth);
router.post('/auth/refresh-token', userController.refreshToken);

// Routes des idées business
router.get('/ideas', auth, ideaController.getAllIdeas);
router.post('/ideas', auth, ideaController.createIdea);
router.get('/ideas/:id', auth, ideaController.getIdeaById);
router.put('/ideas/:id', auth, ideaController.updateIdea);
router.delete('/ideas/:id', auth, ideaController.deleteIdea);
router.post('/ideas/:id/analyze', auth, ideaController.analyzeIdea);
router.post('/ideas/:id/feedback', auth, ideaController.addFeedback);

// Routes AI
router.post('/ideas/generate-ai', auth, aiController.generateBusinessIdea);
router.get('/ideas/:id/ai-insights', auth, aiController.getAIInsights);

// Routes des intégrations
router.get('/integrations', auth, integrationController.getIntegrations);
router.post('/integrations/google/callback', integrationController.googleCallback);
router.post('/integrations/notion/callback', integrationController.notionCallback);
router.post('/integrations/slack/callback', integrationController.slackCallback);
router.delete('/integrations/:service', auth, integrationController.removeIntegration);

// Webhooks
router.post('/webhooks/notion', integrationController.notionWebhook);
router.post('/webhooks/slack', integrationController.slackWebhook);

export default router;
