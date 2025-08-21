import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 lg:grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 p-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 bg-grid-gray-200/30 dark:bg-grid-gray-700/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        ></motion.div>
        <div className="relative z-10">
          <Link to="/" className="inline-block mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-lg">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
            Donnez vie à vos meilleures idées
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Rejoignez une communauté d'innovateurs et transformez vos concepts en réalité.
          </p>
        </div>
        <div className="absolute bottom-8 text-sm text-gray-500 dark:text-gray-400">
          © 2025 BizIdea. Tous droits réservés.
        </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold font-heading text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
