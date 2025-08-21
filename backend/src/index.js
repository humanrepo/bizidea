import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/error.middleware.js';
import { setupPassport } from './config/passport.js';
import routes from './api/routes.js';

// Configuration des variables d'environnement
dotenv.config();

const app = express();

// Middleware de base
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de Passport
setupPassport(passport);
app.use(passport.initialize());

// Routes API
app.use('/api', routes);

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Connexion à MongoDB Atlas
mongoose.connect('mongodb+srv://arnolddigital:Godblessme25@cluster0.2h2f3rs.mongodb.net/business-ideas')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
