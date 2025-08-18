# Guide de Contribution

## 🌳 Structure des branches

```
main
├── frontend-refactor
│   ├── feature/navbar
│   ├── feature/dashboard
│   └── feature/auth
└── backend-dev
    ├── feature/api-setup
    ├── feature/auth-api
    └── feature/ideas-api
```

## 🚀 Workflow de développement

1. **Création d'une branche**
   ```bash
   git checkout frontend-refactor  # ou backend-dev
   git pull origin frontend-refactor
   git checkout -b feature/nom-feature
   ```

2. **Développement**
   - Commits atomiques et clairs
   - Messages de commit explicites
   - Tests avant push

3. **Push et Pull Request**
   ```bash
   git push origin feature/nom-feature
   ```
   - Créer une PR vers frontend-refactor ou backend-dev
   - Remplir le template de PR
   - Demander une review

## 📝 Conventions de Code

### Commits

Format: `type(scope): description`

Types:
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Maintenance

Exemple: `feat(auth): add login form validation`

### JavaScript/TypeScript
- Utiliser ES6+
- Nommer en camelCase
- Documenter les fonctions complexes

### CSS/Tailwind
- Suivre la convention BEM
- Utiliser les classes utilitaires Tailwind
- Éviter le CSS personnalisé sauf nécessité

## 🧪 Tests

- Écrire des tests pour les nouvelles fonctionnalités
- Vérifier que tous les tests passent avant de push
- Tester sur différents navigateurs

## 📱 Responsive Design

- Mobile First
- Breakpoints standards :
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## ♿ Accessibilité

- WCAG 2.1 niveau AA minimum
- Tester avec lecteurs d'écran
- Utiliser les attributs ARIA appropriés

## 🚀 Performance

- Optimiser les images
- Lazy loading quand possible
- Minimiser les dépendances
- Score Lighthouse > 90

## 🔄 Processus de Review

1. **Auto-review**
   - Code propre et commenté
   - Tests passent
   - Pas de conflits
   - Documentation à jour

2. **Review par les pairs**
   - Au moins un reviewer
   - Répondre aux commentaires
   - Résoudre les discussions

3. **Critères de merge**
   - Approbation requise
   - CI/CD vert
   - Conflicts résolus
