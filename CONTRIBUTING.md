# 🤝 Guide de Contribution à BizIdea

Nous adorons vos contributions ! Nous voulons rendre la contribution à BizIdea aussi simple et transparente que possible, que ce soit pour :

- 🐛 Signaler un bug
- 💬 Discuter de l'état actuel du code
- 🔧 Soumettre une correction
- 💡 Proposer de nouvelles fonctionnalités
- 👥 Devenir mainteneur

## 🚀 Nous développons avec GitHub

Nous utilisons GitHub pour héberger le code, suivre les issues et demandes de fonctionnalités, ainsi que pour accepter les pull requests.

## 📋 Workflow de développement

Nous utilisons le [GitHub Flow](https://guides.github.com/introduction/flow/index.html), donc tous les changements de code passent par des pull requests.

### Processus de contribution

1. **Forker le dépôt** et créer votre branche à partir de `dev`
2. **Créer une branche** avec une nomenclature claire :

   ```bash
   git checkout -b type/description-courte
   ```

   Types de branches :

   - `feat/` - Nouvelles fonctionnalités
   - `fix/` - Corrections de bugs
   - `docs/` - Documentation
   - `style/` - Formatage du code
   - `refactor/` - Refactorisation
   - `test/` - Tests
   - `chore/` - Tâches de maintenance

3. **Faire vos changements** en suivant les conventions de code
4. **Ajouter des tests** si vous ajoutez du code qui devrait être testé
5. **Mettre à jour la documentation** si vous changez les APIs
6. **Vérifier que la suite de tests passe**
7. **S'assurer que le code est linté**
8. **Ouvrir une Pull Request** !

## 📝 Convention des messages de commit

Nous utilisons la convention conventionnelle des commits :

```bash
git commit -m "feat: ajouter l'authentification Google"
git commit -m "fix: corriger le bug de chargement des images"
git commit -m "docs: mettre à jour le guide d'installation"
```

Types de commits :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage du code
- `refactor:` Refactorisation
- `test:` Tests
- `chore:` Tâches de maintenance

## 🐛 Signaler des bugs

Nous utilisons les [issues GitHub](https://github.com/humanrepo/bizidea/issues) pour suivre les bugs publics.

### Comment signaler un bug efficacement

**Un bon rapport de bug** contient généralement :

- **Résumé rapide** et/ou contexte
- **Étapes pour reproduire**
  - Soyez spécifique !
  - Donnez du code exemple si possible
- **Comportement attendu**
- **Comportement actuel**
- **Notes** (pourquoi vous pensez que ça arrive, ce que vous avez essayé qui n'a pas fonctionné)

### Template de rapport de bug

```markdown
## Description du bug

[Description claire et concise du bug]

## Étapes pour reproduire

1. Aller à '...'
2. Cliquer sur '....'
3. Scrolller jusqu'à '....'
4. Voir l'erreur

## Comportement attendu

[Description de ce qui devrait se passer]

## Comportement actuel

[Description de ce qui se passe actuellement]

## Captures d'écran

[Si applicable, ajoutez des captures d'écran]

## Environnement

- OS: [ex: Windows, macOS, Linux]
- Navigateur: [ex: Chrome, Firefox, Safari]
- Version: [ex: 22]

## Informations supplémentaires

[Ajoutez toute information supplémentaire]
```

## 💡 Proposer des fonctionnalités

Nous accueillons favorablement les propositions de fonctionnalités !

### Processus de proposition

1. **Vérifier les issues existantes** pour éviter les doublons
2. **Créer une nouvelle issue** avec le label "enhancement"
3. **Décrire la fonctionnalité** en détail
4. **Expliquer le cas d'usage** et la valeur ajoutée
5. **Proposer une implémentation** si possible

## 🎨 Style de code

### Frontend (React/TypeScript)

- Utiliser TypeScript strict
- Composants fonctionnels avec hooks
- Nommage PascalCase pour les composants
- Utiliser les hooks personnalisés pour la logique métier

### Backend (Node.js/Express)

- Async/await pour les opérations asynchrones
- Gestion d'erreurs centralisée
- Validation des données d'entrée

### Python (AI Service)

- Respecter PEP 8
- Typing hints
- Docstrings complètes

### Formatage

- 2 espaces pour l'indentation
- Points-virgules optionnels mais cohérents
- Guillemets simples pour JavaScript
- Exécuter `npm run lint` avant de commit

## 🔧 Configuration du environnement de développement

### Prérequis

- Node.js 18+
- npm ou yarn
- Python 3.8+
- Git

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/humanrepo/bizidea.git
cd bizidea

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
```

### Commandes utiles

```bash
# Développement
npm run dev          # Tous les services
npm run dev:frontend # Frontend seulement
npm run dev:backend  # Backend seulement

# Tests
npm run test        # Tous les tests
npm run test:frontend # Tests frontend
npm run test:backend # Tests backend

# Linting
npm run lint        # Vérification style
npm run lint:fix    # Correction automatique

# Build
npm run build       # Build production
```

## 📜 Licence

En contribuant, vous acceptez que vos contributions soient sous la même [licence MIT](http://choosealicense.com/licenses/mit/) que le projet.

## ❓ Questions ?

- 📖 Consultez la [documentation](README.md)
- 🐛 Créez une [issue](https://github.com/humanrepo/bizidea/issues)
- 💬 Rejoignez les [discussions](https://github.com/humanrepo/bizidea/discussions)
- 📧 Contactez-nous : humanrepo@example.com

---

**Merci de contribuer à faire de BizIdea une plateforme extraordinaire !** 🚀
