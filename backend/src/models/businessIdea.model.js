import mongoose from 'mongoose';

const businessIdeaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  marketAnalysis: {
    targetMarket: String,
    competitors: [String],
    marketSize: Number,
    marketTrend: String,
    score: Number
  },
  aiInsights: {
    viabilityScore: {
      type: Number,
      min: 0,
      max: 100
    },
    riskFactors: [String],
    opportunities: [String],
    recommendations: [String]
  },
  status: {
    type: String,
    enum: ['draft', 'analyzing', 'validated', 'archived'],
    default: 'draft'
  },
  tags: [String],
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  feedback: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index pour la recherche full-text
businessIdeaSchema.index({
  title: 'text',
  description: 'text',
  industry: 'text',
  tags: 'text'
});

export const BusinessIdea = mongoose.model('BusinessIdea', businessIdeaSchema);
