# 🚀 Getting Started - HumanOS BizIdea Frontend

## 📋 Prérequis
- Node.js 18+ 
- Git
- VSCode avec les extensions recommandées
- Compte GitHub avec accès au repository

## 🎯 Premier Jour - Setup Complet

### 1. Configuration de l'Environnement
```bash
# Cloner le repository (si nouveau)
git clone https://github.com/humanrepo/bizidea.git
cd bizidea

# Installer les extensions VSCode recommandées
# Ouvrir .vscode/extensions.json et installer les extensions listées
```

### 2. Installation des Dépendances
```bash
# Se positionner sur le frontend
cd frontend

# Installer les dépendances
npm install

# Vérifier que tout fonctionne
npm run dev
```

### 3. Configuration Git
```bash
# Vérifier la configuration
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@humanos.com"

# Se synchroniser avec la branche dev
git checkout dev
git pull origin dev

# Créer votre branche de travail
git checkout -b feature/votre-nom-premiere-fonctionnalite
```

## 🛠️ Outils de Développement

### Scripts Disponibles
```bash
# Lancer le menu interactif
./frontend-dev.bat

# Ou directement:
npm run dev          # Serveur de développement
npm run build        # Build production
npm run test         # Tests
npm run lint         # Vérification code
npm run type-check   # Vérification TypeScript
```

### VSCode Configuration
Les fichiers suivants sont configurés:
- `.vscode/settings.json` - Paramètres de l'éditeur
- `.vscode/extensions.json` - Extensions recommandées
- `.vscode/humanos-snippets.code-snippets` - Snippets personnalisés

## 📚 Documentation Essentielle

### Fichiers à Consulter
1. `FRONTEND_COLLABORATION_PLAN.md` - Plan détaillé de collaboration
2. `GIT_WORKFLOW_CHEATSHEET.md` - Commandes Git essentielles
3. `QUICK_START_FRONTEND.md` - Démarrage rapide
4. `.github/PULL_REQUEST_TEMPLATE.md` - Template pour les PR

### Standards de Code
- **Commit Messages**: Conventionnelle (feat, fix, docs, etc.)
- **TypeScript**: Strict mode activé
- **Tailwind**: Classes organisées et responsive
- **Accessibilité**: WCAG 2.1 AA compliant

## 🎨 Développement Frontend

### Structure des Composants
```
src/
├── components/
│   ├── ui/           # Composants de base
│   ├── layout/       # Header, Footer, Navigation
│   └── [feature]/    # Composants par fonctionnalité
├── pages/            # Pages de l'application
├── hooks/            # Custom React hooks
├── lib/              # Utilitaires
├── services/         # API calls
├── store/            # State management
└── styles/           # Styles et design tokens
```

### Nouveau Composant
```bash
# Créer un nouveau composant
# Utiliser le snippet 'rcts' dans VSCode
```

## 🔄 Workflow Quotidien

### Matin
```bash
# Mise à jour depuis dev
git checkout dev
git pull origin dev

# Créer/switch sur feature branch
git checkout -b feature/nouvelle-fonctionnalite
```

### Pendant la Journée
```bash
# Développement normal
npm run dev

# Tests réguliers
npm run test
npm run lint

# Commits fréquents
git add .
git commit -m "feat: description"
```

### Fin de Journée
```bash
# Pousser les changements
git push origin feature/nouvelle-fonctionnalite

# Créer Pull Request sur GitHub
# Utiliser le template fourni
```

## 🧪 Qualité et Tests

### Checklist avant PR
- [ ] Tests passants `npm run test`
- [ ] Linting OK `npm run lint`
- [ ] TypeScript valide `npm run type-check`
- [ ] Accessibilité vérifiée
- [ ] Responsive design testé
- [ ] Documentation mise à jour

### Outils de Vérification
- **Lighthouse**: Audit performance/accessibilité
- **ESLint**: Qualité du code
- **Prettier**: Formatage consistent
- **Jest**: Tests unitaires

## 🆘 Support et Dépannage

### Problèmes Communs
```bash
# Dépendances corrompues
rm -rf node_modules package-lock.json
npm install

# Erreurs TypeScript
npm run type-check

# Conflits Git
git status # Voir les conflits
# Résoudre manuellement puis:
git add .
git commit -m "fix: resolve conflicts"
```

### Resources
- Documentation: Fichiers .md dans le projet
- Support: Contacter Mayele via GitHub
- Communauté: Discussions GitHub du projet

## 🚀 Déploiement

### Development
```bash
npm run dev
# http://localhost:3000
```

### Production Build
```bash
npm run build
npm run preview
```

### Déploiement Vercel/Netlify
```bash
# Build et déploiement automatique via GitHub
# Connecter le repository à Vercel/Netlify
```

## 📈 Métriques de Succès

### Quality Gates
- ✅ Lighthouse Score > 90
- ✅ Tests Coverage > 80%
- ✅ Accessibilité WCAG AA
- ✅ Performance optimale

### Velocity
- ⏱️ PR reviews sous 24h
- 🚀 Déploiements fréquents
- 📊 Métriques suivies

---

*Dernière mise à jour: $(date +%Y-%m-%d)*  
*Bienvenue dans l'équipe HumanOS BizIdea! 🎉*
