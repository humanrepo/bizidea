import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import {
  Lightbulb,
  Sparkles,
  Target,
  MapPin,
  Euro,
  Clock,
  TrendingUp,
  Users,
  BarChart3,
  Star,
  Bookmark,
  Share2,
  ArrowRight,
  Loader2,
  Filter,
  RefreshCw
} from 'lucide-react'

import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

// Form validation schema
const ideaGenerationSchema = z.object({
  interests: z.array(z.string()).min(1, 'Sélectionnez au moins un intérêt'),
  location: z.string().min(1, 'La localisation est requise'),
  budget_range: z.string().min(1, 'Sélectionnez une fourchette de budget'),
  difficulty_level: z.string().min(1, 'Sélectionnez un niveau de difficulté'),
  count: z.number().min(1).max(10).default(5),
})

type IdeaGenerationForm = z.infer<typeof ideaGenerationSchema>

interface BusinessIdea {
  title: string
  description: string
  problem_statement: string
  solution: string
  target_audience: string
  revenue_model: string
  estimated_cost: number
  time_to_market: number
  difficulty_level: string
  keywords: string[]
  category: string
  search_volume?: number
  trend_score?: number
  ai_confidence?: number
}

const IdeaGeneratorPage = () => {
  const { user } = useAuthStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedIdeas, setGeneratedIdeas] = useState<BusinessIdea[]>([])
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IdeaGenerationForm>({
    resolver: zodResolver(ideaGenerationSchema),
    defaultValues: {
      interests: [],
      location: user?.country_code || 'FR',
      budget_range: '1000-10000',
      difficulty_level: 'intermediate',
      count: 5,
    }
  })

  const watchedInterests = watch('interests')

  const interestOptions = [
    { id: 'tech', label: 'Technologie', icon: '💻' },
    { id: 'health', label: 'Santé', icon: '🏥' },
    { id: 'education', label: 'Éducation', icon: '🎓' },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'food', label: 'Alimentation', icon: '🍕' },
    { id: 'travel', label: 'Voyage', icon: '✈️' },
    { id: 'fitness', label: 'Fitness', icon: '💪' },
    { id: 'sustainability', label: 'Durabilité', icon: '🌱' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'social', label: 'Social', icon: '👥' },
    { id: 'entertainment', label: 'Divertissement', icon: '🎬' },
  ]

  const budgetOptions = [
    { value: '0-1000', label: 'Moins de 1 000€' },
    { value: '1000-10000', label: '1 000€ - 10 000€' },
    { value: '10000-50000', label: '10 000€ - 50 000€' },
    { value: '50000-100000', label: '50 000€ - 100 000€' },
    { value: '100000+', label: 'Plus de 100 000€' },
  ]

  const difficultyOptions = [
    { value: 'beginner', label: 'Débutant', description: 'Peu d\'expérience requise' },
    { value: 'intermediate', label: 'Intermédiaire', description: 'Quelques compétences nécessaires' },
    { value: 'advanced', label: 'Avancé', description: 'Expertise technique requise' },
    { value: 'expert', label: 'Expert', description: 'Très haute expertise' },
  ]

  const locationOptions = [
    { value: 'FR', label: 'France 🇫🇷' },
    { value: 'US', label: 'États-Unis 🇺🇸' },
    { value: 'GB', label: 'Royaume-Uni 🇬🇧' },
    { value: 'DE', label: 'Allemagne 🇩🇪' },
    { value: 'ES', label: 'Espagne 🇪🇸' },
    { value: 'IT', label: 'Italie 🇮🇹' },
    { value: 'CA', label: 'Canada 🇨🇦' },
    { value: 'AU', label: 'Australie 🇦🇺' },
  ]

  const handleInterestToggle = (interestId: string) => {
    const currentInterests = watchedInterests || []
    const newInterests = currentInterests.includes(interestId)
      ? currentInterests.filter(id => id !== interestId)
      : [...currentInterests, interestId]
    
    setValue('interests', newInterests)
  }

  const onSubmit = async (data: IdeaGenerationForm) => {
    try {
      setIsGenerating(true)
      
      const response = await api.ideas.generate({
        interests: data.interests,
        location: data.location,
        budget_range: data.budget_range,
        difficulty_level: data.difficulty_level,
        count: data.count,
      })
      
      setGeneratedIdeas(response.data.ideas || [])
      toast.success(`${response.data.ideas?.length || 0} idées générées !`)
      
    } catch (error: any) {
      toast.error('Erreur lors de la génération d\'idées')
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-50'
      case 'intermediate': return 'text-blue-600 bg-blue-50'
      case 'advanced': return 'text-orange-600 bg-orange-50'
      case 'expert': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-blue-600'
    if (confidence >= 0.4) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Générateur IA • Basé sur des données réelles
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
            Générez vos prochaines{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              idées business
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre IA analyse les tendances du web en temps réel pour vous proposer 
            des idées business validées et adaptées à votre profil.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-soft p-8 sticky top-8">
              <div className="flex items-center mb-6">
                <Lightbulb className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Vos intérêts
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((interest) => (
                      <motion.button
                        key={interest.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          watchedInterests?.includes(interest.id)
                            ? 'bg-primary-100 text-primary-700 border-2 border-primary-200'
                            : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-lg mb-1">{interest.icon}</div>
                        {interest.label}
                      </motion.button>
                    ))}
                  </div>
                  {errors.interests && (
                    <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Localisation cible
                  </label>
                  <select
                    {...register('location')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {locationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Euro className="w-4 h-4 inline mr-1" />
                    Budget disponible
                  </label>
                  <select
                    {...register('budget_range')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Target className="w-4 h-4 inline mr-1" />
                    Niveau de difficulté
                  </label>
                  <div className="space-y-2">
                    {difficultyOptions.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          {...register('difficulty_level')}
                          value={option.value}
                          className="sr-only"
                        />
                        <div className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          watch('difficulty_level') === option.value
                            ? 'border-primary-200 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre d'idées à générer
                  </label>
                  <input
                    type="number"
                    {...register('count', { valueAsNumber: true })}
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isGenerating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-4 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Génération en cours...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Générer les idées
                    </div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-soft p-12 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Génération en cours...
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Notre IA analyse les tendances du web pour vous proposer les meilleures idées
                  </p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : generatedIdeas.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {generatedIdeas.length} idées générées
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSubmit(onSubmit)()}
                      className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-xl font-medium hover:bg-primary-200 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Régénérer
                    </motion.button>
                  </div>

                  {generatedIdeas.map((idea, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(idea.difficulty_level)}`}>
                                {idea.difficulty_level}
                              </span>
                              {idea.ai_confidence && (
                                <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(idea.ai_confidence)} bg-opacity-10`}>
                                  IA: {Math.round(idea.ai_confidence * 100)}%
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              {idea.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                              {idea.description}
                            </p>
                          </div>
                          
                          <div className="flex space-x-2 ml-6">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Bookmark className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Share2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                          <div className="bg-primary-50 p-4 rounded-xl">
                            <div className="flex items-center mb-2">
                              <Euro className="w-5 h-5 text-primary-600 mr-2" />
                              <span className="font-medium text-primary-900">Coût estimé</span>
                            </div>
                            <div className="text-2xl font-bold text-primary-700">
                              {idea.estimated_cost?.toLocaleString()}€
                            </div>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-xl">
                            <div className="flex items-center mb-2">
                              <Clock className="w-5 h-5 text-green-600 mr-2" />
                              <span className="font-medium text-green-900">Temps de dev</span>
                            </div>
                            <div className="text-2xl font-bold text-green-700">
                              {idea.time_to_market} mois
                            </div>
                          </div>
                          
                          {idea.search_volume && (
                            <div className="bg-blue-50 p-4 rounded-xl">
                              <div className="flex items-center mb-2">
                                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                                <span className="font-medium text-blue-900">Recherches/mois</span>
                              </div>
                              <div className="text-2xl font-bold text-blue-700">
                                {idea.search_volume?.toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Problème résolu</h4>
                              <p className="text-gray-600 text-sm">{idea.problem_statement}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Audience cible</h4>
                              <p className="text-gray-600 text-sm">{idea.target_audience}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {idea.keywords?.slice(0, 5).map((keyword, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedIdea(idea)}
                              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
                            >
                              Analyser en détail
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-soft p-12 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-400 rounded-full mb-6">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Prêt à générer vos idées ?
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Configurez vos préférences et laissez notre IA vous proposer 
                    des idées business personnalisées et validées.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdeaGeneratorPage