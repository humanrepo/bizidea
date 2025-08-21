import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.model.js';

export const setupPassport = (passport) => {
  // JWT Strategy
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'fallback-secret-key'
  }, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.userId, {
        attributes: { exclude: ['password'] }
      });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }));

  // Google OAuth Strategy (only if credentials are provided)
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && 
      !process.env.GOOGLE_CLIENT_ID.includes('mock')) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { email: profile.emails[0].value } });
        
        if (user) {
          return done(null, user);
        }
        
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          profilePicture: profile.photos[0].value,
          password: Math.random().toString(36).slice(-8)
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));
  }
};
