import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à SQLite
let db;

async function initDatabase() {
  try {
    db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });

    // Création automatique de la table users
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Connected to SQLite database');
    console.log('✅ Table users created/verified');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
}

// Route POST /signup - Créer un utilisateur
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation des données
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis (name, email, password)'
      });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }

    // Hacher le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insérer le nouvel utilisateur
    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Récupérer l'utilisateur créé (sans le mot de passe)
    const newUser = await db.get(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [result.lastID]
    );

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user: newUser
    });

  } catch (error) {
    console.error('Erreur signup:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de l\'utilisateur'
    });
  }
});

// Route POST /login - Vérifier email + password
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation des données
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    // Trouver l'utilisateur par email
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Connexion réussie (sans renvoyer le mot de passe)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Connexion réussie',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion'
    });
  }
});

// Route GET /users - Lister tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    // Récupérer tous les utilisateurs (sans les mots de passe)
    const users = await db.all('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC');
    
    res.json({
      success: true,
      count: users.length,
      users: users
    });

  } catch (error) {
    console.error('Erreur get users:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des utilisateurs'
    });
  }
});

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Backend MERN avec SQLite',
    endpoints: {
      signup: 'POST /signup',
      login: 'POST /login',
      users: 'GET /users'
    }
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((error, req, res, next) => {
  console.error('Erreur globale:', error);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur interne'
  });
});

// Initialisation et démarrage du serveur
async function startServer() {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log('📋 Endpoints disponibles:');
    console.log('   POST /signup - Créer un utilisateur');
    console.log('   POST /login - Se connecter');
    console.log('   GET /users - Lister les utilisateurs');
  });
}

startServer().catch(console.error);
