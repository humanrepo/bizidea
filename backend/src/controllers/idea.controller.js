import { BusinessIdea } from '../models/businessIdea.model.js';
import axios from 'axios';
import { createError } from '../utils/error.js';

export const getAllIdeas = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, sort = '-createdAt' } = req.query;
    
    const query = { user: req.user.userId };
    if (status) query.status = status;

    const ideas = await BusinessIdea.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await BusinessIdea.countDocuments(query);

    res.json({
      ideas,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    next(error);
  }
};

export const createIdea = async (req, res, next) => {
  try {
    const newIdea = new BusinessIdea({
      ...req.body,
      user: req.user.userId
    });

    await newIdea.save();

    // Appel au service IA pour l'analyse initiale
    try {
      const aiResponse = await axios.post(
        `${process.env.AI_SERVICE_URL}/api/analyze-idea`,
        {
          idea: newIdea.toObject()
        }
      );

      newIdea.aiInsights = aiResponse.data;
      await newIdea.save();
    } catch (aiError) {
      console.error('AI Service Error:', aiError);
      // Continue même si l'analyse IA échoue
    }

    res.status(201).json(newIdea);
  } catch (error) {
    next(error);
  }
};

export const getIdeaById = async (req, res, next) => {
  try {
    const idea = await BusinessIdea.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!idea) {
      throw createError(404, 'Idea not found');
    }

    res.json(idea);
  } catch (error) {
    next(error);
  }
};

export const updateIdea = async (req, res, next) => {
  try {
    const updatedIdea = await BusinessIdea.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      req.body,
      { new: true }
    );

    if (!updatedIdea) {
      throw createError(404, 'Idea not found');
    }

    res.json(updatedIdea);
  } catch (error) {
    next(error);
  }
};

export const deleteIdea = async (req, res, next) => {
  try {
    const deletedIdea = await BusinessIdea.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!deletedIdea) {
      throw createError(404, 'Idea not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const analyzeIdea = async (req, res, next) => {
  try {
    const idea = await BusinessIdea.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!idea) {
      throw createError(404, 'Idea not found');
    }

    // Appel au service IA pour l'analyse
    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL}/api/analyze-idea`,
      {
        idea: idea.toObject()
      }
    );

    idea.aiInsights = aiResponse.data;
    idea.status = 'analyzed';
    await idea.save();

    res.json(idea);
  } catch (error) {
    next(error);
  }
};

export const addFeedback = async (req, res, next) => {
  try {
    const { content, rating } = req.body;

    const idea = await BusinessIdea.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!idea) {
      throw createError(404, 'Idea not found');
    }

    idea.feedback.push({
      user: req.user.userId,
      content,
      rating
    });

    await idea.save();

    res.json(idea);
  } catch (error) {
    next(error);
  }
};
