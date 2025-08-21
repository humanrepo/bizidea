import React, { useState } from 'react'
import { EnhancedCard, EnhancedCardHeader, EnhancedCardTitle, EnhancedCardDescription, EnhancedCardContent, EnhancedCardFooter } from '@/components/ui/EnhancedCard'
import { EnhancedButtonModern } from '@/components/ui/EnhancedButtonModern'
import { EnhancedSkeletonCard } from '@/components/ui/EnhancedSkeleton'

const EnhancedHomePage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)

  const handleGenerateIdea = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
  }

  const features = [
    {
      title: "🤖 AI-Powered Generation",
      description: "Generate unique business ideas using advanced AI algorithms",
      icon: "🧠"
    },
    {
      title: "📊 Market Validation",
      description: "Instant market analysis and validation for your ideas",
      icon: "📈"
    },
    {
      title: "👥 Community Support",
      description: "Connect with entrepreneurs and get feedback",
      icon: "🤝"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your Ideas into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                {" "}Successful Businesses
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Leverage AI to generate, validate, and develop profitable business ideas based on real market needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButtonModern
                size="lg"
                onClick={handleGenerateIdea}
                loading={loading}
              >
                Start Generating Ideas
              </EnhancedButtonModern>
              <EnhancedButtonModern
                variant="outline"
                size="lg"
                onClick={() => setShowSkeleton(!showSkeleton)}
              >
                {showSkeleton ? 'Hide' : 'Show'} Loading Demo
              </EnhancedButtonModern>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our platform provides comprehensive tools for every stage of your entrepreneurial journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <EnhancedCard key={index} interactive>
                <EnhancedCardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <EnhancedCardTitle>{feature.title}</EnhancedCardTitle>
                  <EnhancedCardDescription>
                    {feature.description}
                  </EnhancedCardDescription>
                </EnhancedCardHeader>
                <EnhancedCardContent>
                  <div className="space-y-2">
                    <EnhancedSkeletonCard />
                  </div>
                </EnhancedCardContent>
                <EnhancedCardFooter>
                  <EnhancedButtonModern variant="ghost" size="sm">
                    Learn More →
                  </EnhancedButtonModern>
                </EnhancedCardFooter>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of entrepreneurs who have already transformed their ideas into reality
          </p>
          <EnhancedButtonModern
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Started Free
          </EnhancedButtonModern>
        </div>
      </section>
    </div>
  )
}

export default EnhancedHomePage
