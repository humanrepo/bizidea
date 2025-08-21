# Guide de Démarrage Rapide

## 🚀 Démarrage Automatique

### Option 1: Script Batch (Windows)
```bash
# Double-cliquez sur start.bat ou exécutez :
start.bat
```

### Option 2: Script PowerShell
```powershell
# Clic droit > "Exécuter avec PowerShell" sur start.ps1 ou :
.\start.ps1
```

### Option 3: Démarrage Manuel

#### Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```

#### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

## 📍 URLs

- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:3000

## 🧪 Test du Backend

```bash
# Installer axios globalement si nécessaire
npm install -g axios

# Tester le backend
node test-backend.js
```

## 📋 Endpoints API Principaux

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Idées Business
- `GET /api/ideas` - Lister les idées
- `POST /api/ideas` - Créer une idée
- `GET /api/ideas/:id` - Détails d'une idée
- `PUT /api/ideas/:id` - Modifier une idée
- `DELETE /api/ideas/:id` - Supprimer une idée

## 🔧 Configuration

### Variables d'environnement (backend/.env)
```env
DATABASE_PATH=./database.sqlite
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=5000
```

## 📦 Technologies

### Backend
- Node.js + Express
- SQLite + Sequelize
- JWT Authentication
- Passport.js

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- React Query
- Zustand

## 🐛 Dépannage

### Backend ne démarre pas
1. Vérifiez que Node.js est installé : `node --version`
2. Installez les dépendances : `cd backend && npm install`
3. Vérifiez le fichier .env

### Frontend ne démarre pas
1. Installez les dépendances : `cd frontend && npm install`
2. Vérifiez que le port 3000 est libre

### Base de données
- Le fichier SQLite `database.sqlite` est créé automatiquement
- En cas de problème, supprimez le fichier et redémarrez

## 📞 Support

En cas de problème, vérifiez :
1. Les logs dans les terminaux
2. Que tous les ports sont libres (3000, 5000)
3. Que toutes les dépendances sont installées