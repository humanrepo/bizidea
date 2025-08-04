import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  BarChart3,
  Target,
  Rocket
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Générateur d'idées IA",
      description: "Génération d'idées business basées sur des besoins réels détectés en ligne via IA et scraping web.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analyse du potentiel",
      description: "Volume de recherche, analyse de concurrence, faisabilité et coût estimé pour chaque idée.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Mentorat IA 24/7",
      description: "Assistant intelligent disponible en permanence pour répondre à toutes vos questions entrepreneuriales.",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Communauté d'entrepreneurs",
      description: "Groupe d'entraide, partage d'expériences, retours sur idées et feedback utilisateurs.",
      color: "from-pink-400 to-red-500"
    }
  ]

  const stats = [
    { number: "10K+", label: "Idées générées", icon: <Lightbulb className="w-6 h-6" /> },
    { number: "2.5K+", label: "Entrepreneurs actifs", icon: <Users className="w-6 h-6" /> },
    { number: "85%", label: "Taux de validation", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "24/7", label: "Support IA", icon: <MessageCircle className="w-6 h-6" /> }
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Fondatrice, TechStart",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      content: "Grâce à cette plateforme, j'ai trouvé l'idée parfaite pour mon business. L'analyse de marché m'a vraiment aidée à valider le concept."
    },
    {
      name: "Pierre Martin",
      role: "CEO, InnovateLab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      content: "Le mentor IA est incroyable ! Il m'a guidé à travers toutes les étapes de création de ma startup. Un outil indispensable."
    },
    {
      name: "Sophie Chen",
      role: "Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      content: "La communauté est fantastique. J'ai reçu des retours précieux qui ont complètement transformé mon approche business."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Alimenté par l'IA • Basé sur des données réelles
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
                Générez des{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  idées business
                </span>{' '}
                qui marchent vraiment
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Une plateforme intelligente qui génère des idées business basées sur des besoins réels 
                détectés en ligne. Validez, analysez et lancez votre projet avec l'aide de l'IA.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/auth/register"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    Commencer gratuitement
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/demo"
                    className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
                  >
                    Voir la démo
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-20 animate-pulse-slow" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary-400 to-pink-400 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Idée générée par IA</h3>
                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Validée
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Plateforme de covoiturage pour animaux
                  </h4>
                  
                  <p className="text-gray-600 mb-6">
                    Service de transport partagé pour les propriétaires d'animaux, 
                    réduisant les coûts vétérinaires et créant une communauté.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <div className="text-primary-600 font-semibold">Marché</div>
                      <div className="text-2xl font-bold text-primary-700">€2.5M</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-green-600 font-semibold">Score IA</div>
                      <div className="text-2xl font-bold text-green-700">92%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full border-2 border-white" />
                      ))}
                      <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                        +12
                      </div>
                    </div>
                    <button className="text-primary-600 font-medium hover:text-primary-700">
                      Voir l'analyse →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-xl mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
              Tout ce dont vous avez besoin pour{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                réussir
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants alimentés par l'IA pour générer, valider et développer 
              vos idées business avec succès.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} text-white rounded-2xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez ce que disent nos entrepreneurs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 text-white mx-auto mb-8" />
            <h2 className="text-3xl lg:text-5xl font-bold font-heading text-white mb-6">
              Prêt à lancer votre prochaine idée ?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'entrepreneurs qui utilisent notre plateforme 
              pour transformer leurs idées en succès.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/demo"
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-primary-600 transition-all"
                >
                  Essayer la démo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage