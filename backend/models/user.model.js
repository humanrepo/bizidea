import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // ... autres champs existants ...
  
  integrations: {
    google: {
      accessToken: String,
      refreshToken: String,
      calendarEnabled: Boolean,
    },
    notion: {
      accessToken: String,
      workspaceId: String
    },
    slack: {
      accessToken: String,
      teamId: String
    }
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
