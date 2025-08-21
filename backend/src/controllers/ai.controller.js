import axios from 'axios';
import { BusinessIdea } from '../models/businessIdea.model.js';
import { createError } from '../utils/error.js';

export const generateBusinessIdea = async (req, res, next) => {
  try {
    const { industry, interests, budget, experience, marketConstraints } = req.body;
    
    // Validate input
    if (!industry || !interests || !budget) {
      throw createError(400, 'Industry, interests, and budget are required');
    }

    // Call AI service
    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL}/api/generate-idea`,
      {
        industry,
        userInterests: interests,
        marketConstraints: marketConstraints || [],
        userExperience: experience || ''
      }
    );

    const generatedIdea = aiResponse.data;

    // Save to database
    const newIdea = new BusinessIdea({
      user: req.user.userId,
      title: generatedIdea.title,
      description: generatedIdea.description,
      industry,
      marketAnalysis: {
        targetMarket: `Users interested in ${industry}`,
        competitors: [],
        marketSize: 0,
        marketTrend: 'Growing',
        score: generatedIdea.viabilityScore
      },
      aiInsights: {
        viabilityScore: generatedIdea.viabilityScore,
        riskFactors: [],
        opportunities: generatedIdea.recommendations,
        recommendations: generatedIdea.recommendations
      },
      status: 'draft'
    });

    await newIdea.save();

    res.json({
      success: true,
      idea: newIdea,
      message: 'Business idea generated successfully'
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    next(createError(500, 'Failed to generate business idea'));
  }
};

export const getAIInsights = async (req, res, next) => {
  try {
    const { ideaId } = req.params;
    
    const idea = await BusinessIdea.findOne({
      _id: ideaId,
      user: req.user.userId
    });

    if (!idea) {
      throw createError(404, 'Idea not found');
    }

    res.json({
      success: true,
      insights: idea.aiInsights
    });

  } catch (error) {
    next(error);
  }
};
