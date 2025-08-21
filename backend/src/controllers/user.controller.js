import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { createError } from '../utils/error.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(400, 'Email already registered');
    }

    // Créer le nouvel utilisateur
    const user = new User({
      email,
      password,
      name
    });

    await user.save();

    // Générer le token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Envoyer la réponse sans le mot de passe
    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json({
      user: userObject,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, 'Invalid credentials');
    }

    // Vérifier le mot de passe
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw createError(401, 'Invalid credentials');
    }

    // Générer le token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Envoyer la réponse sans le mot de passe
    const userObject = user.toObject();
    delete userObject.password;

    res.json({
      user: userObject,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      throw createError(404, 'User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { token } = req.body;

    // Vérifier le token Google
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const { email, name, picture } = ticket.getPayload();

    // Trouver ou créer l'utilisateur
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        profilePicture: picture,
        password: Math.random().toString(36).slice(-8)
      });
      await user.save();
    }

    // Générer le token JWT
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userObject = user.toObject();
    delete userObject.password;

    res.json({
      user: userObject,
      token: jwtToken
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Générer un nouveau token
    const newToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token: newToken });
  } catch (error) {
    next(createError(401, 'Invalid token'));
  }
};
