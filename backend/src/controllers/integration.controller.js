import { User } from '../models/user.model.js';
import { createError } from '../utils/error.js';
import axios from 'axios';

export const getIntegrations = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({
      google: user.integrations.google,
      notion: user.integrations.notion,
      slack: user.integrations.slack
    });
  } catch (error) {
    next(error);
  }
};

export const googleCallback = async (req, res, next) => {
  try {
    const { code } = req.body;
    
    // Échanger le code contre un token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // Mettre à jour l'utilisateur
    await User.findByIdAndUpdate(req.user.userId, {
      'integrations.google': {
        accessToken: access_token,
        refreshToken: refresh_token,
        calendarEnabled: true
      }
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const notionCallback = async (req, res, next) => {
  try {
    const { code } = req.body;
    
    // Échanger le code contre un token
    const tokenResponse = await axios.post('https://api.notion.com/v1/oauth/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.NOTION_REDIRECT_URI
    }, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
        ).toString('base64')}`
      }
    });

    const { access_token, workspace_id } = tokenResponse.data;

    // Mettre à jour l'utilisateur
    await User.findByIdAndUpdate(req.user.userId, {
      'integrations.notion': {
        accessToken: access_token,
        workspaceId: workspace_id
      }
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const slackCallback = async (req, res, next) => {
  try {
    const { code } = req.body;
    
    // Échanger le code contre un token
    const tokenResponse = await axios.post('https://slack.com/api/oauth.v2.access', null, {
      params: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code,
        redirect_uri: process.env.SLACK_REDIRECT_URI
      }
    });

    const { access_token, team_id } = tokenResponse.data;

    // Mettre à jour l'utilisateur
    await User.findByIdAndUpdate(req.user.userId, {
      'integrations.slack': {
        accessToken: access_token,
        teamId: team_id
      }
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const removeIntegration = async (req, res, next) => {
  try {
    const { service } = req.params;
    const update = {};
    update[`integrations.${service}`] = {};

    await User.findByIdAndUpdate(req.user.userId, update);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const notionWebhook = async (req, res, next) => {
  try {
    const { type, userId, pageId } = req.body;

    // Vérifier la signature Notion
    const signature = req.headers['x-notion-signature'];
    if (!verifyNotionSignature(signature, req.body)) {
      throw createError(401, 'Invalid signature');
    }

    // Traiter l'événement
    switch (type) {
      case 'page_created':
        // Synchroniser avec notre base de données
        break;
      case 'page_updated':
        // Mettre à jour nos données
        break;
      default:
        console.log('Unhandled webhook type:', type);
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const slackWebhook = async (req, res, next) => {
  try {
    // Vérifier la signature Slack
    const signature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    
    if (!verifySlackSignature(signature, timestamp, req.body)) {
      throw createError(401, 'Invalid signature');
    }

    const { type, event } = req.body;

    // Traiter l'événement
    switch (type) {
      case 'event_callback':
        await handleSlackEvent(event);
        break;
      case 'url_verification':
        return res.json({ challenge: req.body.challenge });
      default:
        console.log('Unhandled webhook type:', type);
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Fonctions utilitaires
function verifyNotionSignature(signature, body) {
  // Implémenter la vérification de signature Notion
  return true; // TODO: Implémenter la vérification réelle
}

function verifySlackSignature(signature, timestamp, body) {
  // Implémenter la vérification de signature Slack
  return true; // TODO: Implémenter la vérification réelle
}

async function handleSlackEvent(event) {
  // Gérer les différents types d'événements Slack
  switch (event.type) {
    case 'message':
      // Traiter les messages
      break;
    case 'app_mention':
      // Traiter les mentions de l'app
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }
}
