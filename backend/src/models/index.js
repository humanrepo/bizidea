import { User } from './user.model.js';
import { BusinessIdea } from './businessIdea.model.js';

// Définir les associations
User.hasMany(BusinessIdea, { foreignKey: 'userId', as: 'ideas' });
BusinessIdea.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  User,
  BusinessIdea
};