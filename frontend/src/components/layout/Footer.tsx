import { Github, Lightbulb, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link to={to} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
    {children}
  </Link>
)

const SocialLink = ({ href, icon: Icon }: { href: string, icon: React.ElementType }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
    <Icon className="w-5 h-5" />
  </a>
)

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                HumanOS BizIdea
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Validez et affinez vos idées d'entreprise avec la puissance de l'IA.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Produit</h3>
            <ul className="mt-4 space-y-4">
              <li><FooterLink to="/features">Fonctionnalités</FooterLink></li>
              <li><FooterLink to="/pricing">Tarifs</FooterLink></li>
              <li><FooterLink to="/faq">FAQ</FooterLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Entreprise</h3>
            <ul className="mt-4 space-y-4">
              <li><FooterLink to="/about">À propos</FooterLink></li>
              <li><FooterLink to="/contact">Contact</FooterLink></li>
              <li><FooterLink to="/blog">Blog</FooterLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Légal</h3>
            <ul className="mt-4 space-y-4">
              <li><FooterLink to="/privacy">Confidentialité</FooterLink></li>
              <li><FooterLink to="/terms">Conditions</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 md:order-1">
            &copy; {new Date().getFullYear()} BizIdea. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 md:order-2">
            <SocialLink href="https://twitter.com" icon={Twitter} />
            <SocialLink href="https://linkedin.com" icon={Linkedin} />
            <SocialLink href="https://github.com" icon={Github} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
