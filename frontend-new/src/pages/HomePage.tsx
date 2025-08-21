import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, BrainCircuit, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <motion.div
    className="bg-white dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 shadow-soft hover:shadow-medium transition-all duration-300"
    whileHover={{ y: -6, scale: 1.02 }}
  >
    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl text-white mb-5 shadow-lg">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{children}</p>
  </motion.div>
);

const Step = ({ num, title, children }: { num: string, title: string, children: React.ReactNode }) => (
  <div className="flex items-start space-x-5">
    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full text-white font-bold text-xl shadow-lg">
      {num}
    </div>
    <div className="pt-1">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{children}</p>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <main className="overflow-hidden">
        <section className="relative pt-28 pb-36 text-center">
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/40 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)] dark:[mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-primary-100/30 to-transparent dark:from-primary-900/20 dark:to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold font-heading bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-secondary-600 leading-tight tracking-tight">
                Transformez vos Idées en Succès
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-8">
                Notre plateforme IA analyse, affine et valide vos concepts d'entreprise pour vous donner une longueur d'avance.
              </p>
              <div className="mt-10 flex justify-center items-center gap-x-5">
                <Button asChild size="lg">
                  <Link to="/auth/register">
                    Commencer Gratuitement
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/auth/login">Se connecter</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white dark:bg-gray-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold font-heading text-gray-900 dark:text-white tracking-tight">
                Une suite d'outils puissants
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-8">
                Tout ce dont vous avez besoin pour passer de l'étincelle à la réalité, propulsé par l'IA.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard icon={<Zap className="w-6 h-6" />} title="Génération d'Idées">
                Recevez des concepts d'entreprise innovants basés sur vos centres d'intérêt et les tendances du marché.
              </FeatureCard>
              <FeatureCard icon={<BrainCircuit className="w-6 h-6" />} title="Analyse IA Approfondie">
                Obtenez une évaluation complète de la viabilité, du marché potentiel et des risques de votre idée.
              </FeatureCard>
              <FeatureCard icon={<BarChart3 className="w-6 h-6" />} title="Rapports Détaillés">
                Visualisez les forces, les faiblesses et les opportunités avec des rapports clairs et exploitables.
              </FeatureCard>
              <FeatureCard icon={<Users className="w-6 h-6" />} title="Communauté d'Innovateurs">
                Partagez vos idées, recevez des feedbacks et collaborez avec d'autres entrepreneurs.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold font-heading text-gray-900 dark:text-white tracking-tight">
                Lancez-vous en trois étapes simples
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-8 lg:mx-auto">
                Notre processus intuitif vous guide de l'inspiration à la validation en quelques clics.
              </p>
            </div>
            <div className="mt-16 max-w-3xl mx-auto space-y-12">
              <Step num="1" title="Soumettez votre idée">
                Décrivez votre concept d'entreprise ou laissez notre IA vous en proposer un.
              </Step>
              <Step num="2" title="Analyse par l'IA">
                Notre algorithme évalue votre idée sous tous les angles : marché, concurrence, monétisation...
              </Step>
              <Step num="3" title="Recevez votre rapport">
                Explorez votre tableau de bord personnalisé avec des insights et des recommandations pour votre projet.
              </Step>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white dark:bg-gray-800/40">
          <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:py-24 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
              <span className="block">Prêt à donner vie à votre idée ?</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Rejoignez des milliers d'entrepreneurs qui construisent l'avenir.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link to="/auth/register">Créer mon compte gratuitement</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
