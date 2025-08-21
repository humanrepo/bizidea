# Backend MERN avec PostgreSQL

Backend Node.js utilisant Express, Sequelize et PostgreSQL pour un projet MERN de gestion d'idées business.

## Installation

```bash
npm install
```

## Configuration

1. Copiez le fichier `.env` et configurez vos variables d'environnement
2. Assurez-vous que PostgreSQL est installé et en cours d'exécution
3. Créez une base de données `business_ideas_db`

## Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

Le serveur démarre sur http://localhost:5000

## Endpoints disponibles

### Authentification
- `POST /api/auth/register` - Créer un nouvel utilisateur
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/me` - Profil utilisateur (authentifié)
- `POST /api/auth/google` - Authentification Google
- `POST /api/auth/refresh-token` - Rafraîchir le token

### Idées Business
- `GET /api/ideas` - Lister les idées (authentifié)
- `POST /api/ideas` - Créer une idée (authentifié)
- `GET /api/ideas/:id` - Détails d'une idée (authentifié)
- `PUT /api/ideas/:id` - Modifier une idée (authentifié)
- `DELETE /api/ideas/:id` - Supprimer une idée (authentifié)
- `POST /api/ideas/:id/analyze` - Analyser une idée avec IA (authentifié)
- `POST /api/ideas/:id/feedback` - Ajouter un feedback (authentifié)

### Intégrations
- `GET /api/integrations` - Lister les intégrations (authentifié)
- `POST /api/integrations/google/callback` - Callback Google
- `POST /api/integrations/notion/callback` - Callback Notion
- `POST /api/integrations/slack/callback` - Callback Slack
- `DELETE /api/integrations/:service` - Supprimer une intégration (authentifié)

## Base de données

- **Type**: PostgreSQL
- **ORM**: Sequelize
- **Tables**: `Users`, `BusinessIdeas`

## Sécurité

- Mots de passe hachés avec bcryptjs
- Authentification JWT
- Validation des données d'entrée
- Middleware de sécurité (helmet)
- Gestion d'erreurs complète

## Technologies

- Node.js + Express
- PostgreSQL + Sequelize
- JWT pour l'authentification
- Passport.js pour OAuth
- Helmet pour la sécurité
- Morgan pour les logs