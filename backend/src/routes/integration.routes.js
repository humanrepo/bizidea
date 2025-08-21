import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import {
  getIntegrations,
  googleCallback,
  notionCallback,
  slackCallback,
  removeIntegration,
  notionWebhook,
  slackWebhook
} from '../controllers/integration.controller.js';

const router = express.Router();

// Routes protégées
router.get('/', verifyToken, getIntegrations);
router.post('/google/callback', verifyToken, googleCallback);
router.post('/notion/callback', verifyToken, notionCallback);
router.post('/slack/callback', verifyToken, slackCallback);
router.delete('/:service', verifyToken, removeIntegration);

// Webhooks (pas de vérification de token - utilise leurs propres mécanismes d'authentification)
router.post('/webhooks/notion', notionWebhook);
router.post('/webhooks/slack', slackWebhook);

export default router;
