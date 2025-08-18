# Business Idea Generator

## 🚀 Projet

Une plateforme innovante qui utilise l'IA pour générer et valider des idées business.

## 🌟 Fonctionnalités

- 🤖 Génération d'idées business par IA
- 📊 Validation de marché automatisée
- 👥 Communauté d'entrepreneurs
- 📱 Interface responsive et moderne
- 🌙 Mode sombre / clair

## 🛠️ Technologies

- **Frontend:**
  - React avec TypeScript
  - Tailwind CSS
  - Vite
  - Framer Motion

- **Backend:**
  - Python
  - FastAPI
  - OpenAI
  - PostgreSQL

## 🚀 Installation

1. **Clone le repo**
   ```bash
   git clone https://github.com/humanrepo/bizidea.git
   cd bizidea
   ```

2. **Installation des dépendances**
   ```bash
   npm install
   ```

3. **Lancement en développement**
   ```bash
   npm run dev
   ```

## 🤝 Contribution

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les détails sur notre processus de contribution.

## 📚 Documentation

- [Guide de Style](docs/STYLE_GUIDE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)

## 👥 Équipe

- [@username1](https://github.com/username1) - Frontend Lead
- [@username2](https://github.com/username2) - Backend Lead
- [@username3](https://github.com/username3) - UI/UX Designer

**Une plateforme intelligente qui génère des idées business basées sur des besoins réels détectés en ligne**

Alimentée par l'IA et le scraping web, cette plateforme aide les entrepreneurs à découvrir, valider et développer des idées business rentables.

## ✨ Nouveautés (Frontend)

### 🎨 Interface améliorée
- HTML5 sémantique optimisé pour l'accessibilité
- Dark/Light mode persistant avec localStorage
- Menu hamburger responsive avec focus trap
- SEO optimisé (meta tags, structure)
- Performance optimisée (images lazy, CSS minimal)

### 🧠 Générateur d'idées IA
- Génération d'idées basées sur des besoins réels détectés en ligne
- Analyse des tendances web en temps réel
- Personnalisation selon vos intérêts et compétences
- Ciblage géographique précis

### 📊 Analyse du potentiel
- Volume de recherche et tendances
- Analyse de la concurrence
- Évaluation de la faisabilité technique
- Estimation des coûts de lancement
- Score de viabilité IA

### 🤖 Mentorat IA 24/7
- Assistant intelligent spécialisé en entrepreneuriat
- Conseils personnalisés pour chaque étape
- Réponses en temps réel à vos questions
- Contexte business préservé

### 👥 Communauté d'entrepreneurs
- Forums de discussion thématiques
- Partage d'expériences et retours
- Validation d'idées par la communauté
- Networking entre entrepreneurs

### 🌍 Fonctionnalités avancées
- Interface multilingue (FR, EN, ES, DE, IT)
- Géolocalisation et ciblage par régions
- Système de notifications intelligent
- Dashboard analytique complet
- Export des données et rapports

## 🛠 Stack Technique

### Backend
- **FastAPI** - API REST moderne et performante
- **PostgreSQL** - Base de données relationnelle
- **Redis** - Cache et sessions
- **SQLAlchemy** - ORM Python
- **OpenAI GPT-4** - Intelligence artificielle
- **Celery** - Tâches asynchrones
- **BeautifulSoup + Selenium** - Web scraping

### Frontend
- **React 18** - Interface utilisateur moderne
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Zustand** - Gestion d'état
- **React Query** - Gestion des données
- **React Hook Form** - Gestion des formulaires

### DevOps & Déploiement
- **Docker & Docker Compose** - Containerisation
- **Nginx** - Reverse proxy et serveur statique
- **GitHub Actions** - CI/CD
- **PostgreSQL** - Base de données production

## 🚀 Installation & Lancement

### Prérequis
- Docker et Docker Compose
- Node.js 18+ (pour le développement local)
- Python 3.11+ (pour le développement local)
- Clé API OpenAI

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/business-idea-generator.git
cd business-idea-generator
```

### 2. Configuration des variables d'environnement
```bash
# Copier le fichier d'exemple
cp backend/.env.example backend/.env

# Éditer les variables d'environnement
nano backend/.env
```

**Variables importantes à configurer :**
```env
# OpenAI (OBLIGATOIRE)
OPENAI_API_KEY=your-openai-api-key-here

# Base de données (optionnel en dev)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/business_ideas_db

# JWT Secret (IMPORTANT en production)
SECRET_KEY=your-super-secret-jwt-key-here

# APIs externes (optionnel)
TWITTER_BEARER_TOKEN=your-twitter-bearer-token
GOOGLE_TRENDS_API_KEY=your-google-trends-key
```

### 3. Lancement avec Docker (Recommandé)
```bash
# Lancer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

### 4. Lancement en développement local

#### Backend
```bash
cd backend

# Installer les dépendances
pip install -r requirements.txt

# Lancer la base de données
docker-compose up -d postgres redis

# Lancer l'API
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🔗 URLs d'accès

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000
- **Documentation API** : http://localhost:8000/api/docs
- **Base de données** : localhost:5432
- **Redis** : localhost:6379

## 📱 Utilisation

### 1. Créer un compte
- Rendez-vous sur http://localhost:3000
- Cliquez sur "S'inscrire"
- Remplissez vos informations

### 2. Générer des idées
- Accédez au générateur d'idées
- Sélectionnez vos intérêts
- Choisissez votre localisation et budget
- Cliquez sur "Générer les idées"

### 3. Analyser le potentiel
- Cliquez sur "Analyser en détail" sur une idée
- Consultez l'analyse de marché complète
- Évaluez la faisabilité et les coûts

### 4. Utiliser le mentor IA
- Accédez au chat IA
- Posez vos questions entrepreneuriales
- Obtenez des conseils personnalisés

### 5. Rejoindre la communauté
- Partagez vos idées dans les forums
- Demandez des retours à la communauté
- Aidez d'autres entrepreneurs

## 🔧 Configuration avancée

### Variables d'environnement complètes

```env
# Application
APP_NAME="Business Idea Generator"
APP_VERSION=1.0.0
DEBUG=True

# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/business_ideas_db

# JWT
SECRET_KEY=your-super-secret-jwt-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI
OPENAI_API_KEY=your-openai-api-key-here
MODEL_NAME=gpt-4-turbo-preview
MAX_TOKENS=2000
TEMPERATURE=0.7

# Redis
REDIS_URL=redis://localhost:6379

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# APIs externes (optionnel)
TWITTER_BEARER_TOKEN=your-twitter-bearer-token
GOOGLE_TRENDS_API_KEY=your-google-trends-key

# CORS
CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]

# Scraping
USER_AGENT="BusinessIdeaBot/1.0"
REQUEST_DELAY=1
```

### Personnalisation de l'IA

Le système utilise des prompts personnalisables pour l'IA. Vous pouvez modifier les prompts dans :
- `backend/services/ai_service.py`
- `backend/models/chat.py` (table `ai_prompt_templates`)

## 🧪 Tests

```bash
# Tests backend
cd backend
pytest

# Tests frontend
cd frontend
npm run test

# Tests d'intégration
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 📦 Déploiement en production

### 1. Configuration production
```bash
# Créer le fichier de production
cp docker-compose.yml docker-compose.prod.yml

# Éditer pour la production
nano docker-compose.prod.yml
```

### 2. Variables d'environnement production
```env
DEBUG=False
SECRET_KEY=your-very-secure-secret-key
DATABASE_URL=postgresql://user:password@your-db-host:5432/business_ideas_db
REDIS_URL=redis://your-redis-host:6379
CORS_ORIGINS=["https://yourdomain.com"]
```

### 3. Lancement production
```bash
# Build et lancement
docker-compose -f docker-compose.prod.yml --profile production up -d

# Migrations base de données
docker-compose exec backend alembic upgrade head
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Issues GitHub** : [Créer un issue](https://github.com/votre-username/business-idea-generator/issues)
- **Discussions** : [GitHub Discussions](https://github.com/votre-username/business-idea-generator/discussions)
- **Email** : support@business-idea-generator.com

## 🎯 Roadmap

### Version 1.1
- [ ] Intégration avec plus d'APIs (Twitter, Reddit, ProductHunt)
- [ ] Système de notification push
- [ ] Export PDF des analyses
- [ ] Mode hors-ligne

### Version 1.2
- [ ] Marketplace d'idées
- [ ] Système de partenariat
- [ ] Intégration avec des outils de gestion de projet
- [ ] API publique pour développeurs

### Version 2.0
- [ ] Application mobile (React Native)
- [ ] IA vocale
- [ ] Réalité augmentée pour la visualisation
- [ ] Blockchain pour la propriété intellectuelle

---

**Fait avec ❤️ par l'équipe Business Idea Generator**

*Transformez vos idées en succès avec l'intelligence artificielle*