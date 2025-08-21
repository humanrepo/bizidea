# 🚀 Quick Start - Frontend HumanOS BizIdea

## Scripts à Copier-Coller

### 1. Initialisation du Projet
```bash
# Se positionner dans le dossier frontend
cd frontend

# Installer les dépendances (si pas déjà fait)
npm install

# Lancer le serveur de développement
npm run dev
```

### 2. Commandes Git Quotidiennes
```bash
# Mettre à jour depuis la branche dev
git fetch origin
git merge origin/dev

# Créer une nouvelle branche de feature
git checkout -b feature/nom-de-votre-feature

# Ajouter et committer les changements
git add .
git commit -m "feat: description de la fonctionnalité"

# Pousser vers GitHub
git push origin feature/nom-de-votre-feature
```

### 3. Vérification Qualité Code
```bash
# Vérifier le linting
npm run lint

# Vérifier les types TypeScript
npm run type-check

# Formatter le code
npm run format
```

## 🎯 Priorités Frontend Immédiates

### 1. Accessibilité (A11Y)
```bash
# Vérifier l'accessibilité d'un composant
# Ajouter ces attributs ARIA:
aria-label="Description de l'élément"
aria-describedby="id-de-la-description"
role="button" # ou "navigation", "main", etc.
tabIndex={0} # pour les éléments focusables
```

### 2. SEO Optimization
```html
<!-- Dans chaque page, ajouter: -->
<title>HumanOS BizIdea - Générateur d'Idées Business</title>
<meta name="description" content="Générez des idées business innovantes avec l'IA HumanOS" />
<meta name="keywords" content="business, idées, IA, entrepreneuriat" />
<meta property="og:title" content="HumanOS BizIdea" />
<meta property="og:description" content="Générateur d'idées business par IA" />
```

### 3. Responsive Design
```css
/* Utiliser les breakpoints Tailwind: */
sm: 640px    /* -> @media (min-width: 640px) */
md: 768px    /* -> @media (min-width: 768px) */
lg: 1024px   /* -> @media (min-width: 1024px) */
xl: 1280px   /* -> @media (min-width: 1280px) */
```

## 📋 Checklist Démarrage Rapide

### Configuration Initiale
- [ ] `npm install` dans /frontend
- [ ] Vérifier que `npm run dev` fonctionne
- [ ] Configurer ESLint/Prettier dans VSCode

### Premier Composant
- [ ] Créer composant dans `/src/components/`
- [ ] Ajouter PropTypes/TypeScript
- [ ] Tests d'accessibilité
- [ ] Responsive design
- [ ] Documentation

### Workflow Git
- [ ] Branche feature créée
- [ ] Commits conventionnels
- [ ] PR vers `dev`
- [ ] Revue de code

## 🛠️ Scripts de Développement

### Démarrage Rapide
```bash
# Terminal 1 - Backend (si nécessaire)
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Tests
npm run test:watch
```

### Build Production
```bash
# Build optimisé
npm run build

# Preview build production
npm run preview

# Analyse du bundle
npm run analyze
```

## 🔍 Vérifications Rapides

### Accessibilité
```javascript
// Vérifier le focus management
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    console.log('Focus management OK');
  }
});

// Vérifier les contrastes de couleurs
// Utiliser l'outil Lighthouse de Chrome
```

### Performance
```bash
# Audit Lighthouse
npm run lighthouse

# Bundle analysis
npm run bundle-analysis
```

### SEO
```bash
# Vérifier les meta tags
curl http://localhost:3000 | grep -i "meta"

# Vérifier les structured data
curl http://localhost:3000 | grep -i "json-ld"
```

## 📞 Support Rapide

### Problèmes Communs
```bash
# Dépendances corrompues
rm -rf node_modules package-lock.json
npm install

# Port déjà utilisé
lsof -ti:3000 | xargs kill

# Erreurs TypeScript
npm run type-check -- --watch
```

### Commandes de Debug
```bash
# Debug React
npm run dev -- --inspect

# Debug Tests
npm run test -- --inspect

# Profile Performance
npm run dev -- --profile
```

## 🚀 Deployment Rapide

### Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Netlify
```bash
# Build et déploiement
npm run build
# Drag & drop le dossier 'dist' sur Netlify
```

---

*Dernière mise à jour: $(date +%Y-%m-%d)*  
*Pour toute question, consulter la documentation complète ou contacter Mayele*
