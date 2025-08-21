# 🚀 Git Workflow Cheatsheet - HumanOS BizIdea

## 📋 Commandes Essentielles Quotidiennes

### Configuration Initiale
```bash
# Cloner le repository (si nouveau)
git clone https://github.com/humanrepo/bizidea.git
cd bizidea

# Se connecter au remote
git remote -v
```

### Démarrage de la Journée
```bash
# Se positionner sur dev et récupérer les dernières modifications
git checkout dev
git pull origin dev

# Créer une nouvelle branche de feature
git checkout -b feature/votre-nom-description

# Exemples:
git checkout -b feature/arnold-navbar-accessibility
git checkout -b feature/arnold-seo-optimization
```

### Workflow de Développement
```bash
# Ajouter les modifications
git add .
git add src/components/Navbar.tsx  # spécifique

# Commit avec message conventionnel
git commit -m "feat: amélioration accessibilité navbar"
git commit -m "fix: correction bug focus mobile"
git commit -m "docs: mise à jour documentation composant"

# Pousser vers GitHub
git push origin feature/arnold-navbar-accessibility
```

### Convention des Messages de Commit
```
feat:     Nouvelle fonctionnalité
fix:      Correction de bug
docs:     Documentation
style:    Formatage, style visuel
refactor: Restructuration sans changement fonctionnel
perf:     Amélioration performance
test:     Tests
chore:    Tâches de maintenance
```

## 🔄 Processus de Pull Request

### 1. Préparation de la PR
```bash
# S'assurer d'être à jour avec dev
git fetch origin
git merge origin/dev

# Résoudre les conflits si nécessaire
# Tester localement
npm run test
npm run lint
```

### 2. Création de la PR sur GitHub
```bash
# Pousser la branche
git push origin feature/arnold-navbar-accessibility
```

### 3. Description de PR (Template)
```
## 🎯 Objectif
[Description des changements]

## 📝 Changes
- [ ] Amélioration accessibilité
- [ ] Optimisation SEO
- [ ] Correctif bug

## 🧪 Tests
- [ ] Tests unitaires passants
- [ ] Accessibilité vérifiée
- [ ] Responsive design OK

## 📸 Screenshots
[Ajouter des captures si applicable]

## 🔗 Réferences
[Issues ou documents liés]
```

### 4. Revue de Code
- Attendre la review de Mayele
- Corriger les feedbacks
- Pousser les corrections
- Marquer la PR comme ready

## 🚨 Gestion des Conflits

### Résolution Simple
```bash
# Mettre à jour depuis dev
git fetch origin
git merge origin/dev

# Résoudre les conflits manuellement
# Marquer les fichiers résolus
git add .
git commit -m "fix: resolve merge conflicts"
```

### Annuler un Merge
```bash
# Annuler le merge
git merge --abort

# Revenir en arrière
git reset --hard HEAD
```

## 🏷️ Gestion des Branches

### Nettoyage
```bash
# Voir les branches locales
git branch

# Supprimer une branche locale
git branch -d feature/branche-terminee

# Supprimer une branche distante
git push origin --delete feature/branche-terminee
```

### Récupération des Branches
```bash
# Voir toutes les branches
git branch -a

# Récupérer une branche distante
git fetch origin
git checkout -b feature/nouvelle-branche origin/feature/nouvelle-branche
```

## 📊 Inspection et Debug

### Status et Logs
```bash
# Voir le status
git status

# Voir l'historique
git log --oneline --graph --all

# Voir les différences
git diff
git diff --staged
```

### Annulation de Modifications
```bash
# Annuler les modifications non commitées
git restore .
git restore src/components/Navbar.tsx

# Annuler le dernier commit (keep changes)
git reset --soft HEAD~1

# Annuler le dernier commit (discard changes)
git reset --hard HEAD~1
```

## 🚀 Scripts Automatisés

### Script de Mise à Jour
```bash
#!/bin/bash
echo "Mise à jour du repository..."
git fetch origin
git merge origin/dev
npm install
echo "✅ Mise à jour terminée!"
```

### Script de PR
```bash
#!/bin/bash
echo "Création de Pull Request..."
git push origin HEAD
echo "✅ Branche poussée! Créez la PR sur GitHub."
```

## 🔧 Configuration Git Recommandée

### .gitconfig
```ini
[user]
    name = Votre Nom
    email = votre.email@humanos.com

[core]
    editor = code --wait
    autocrlf = true

[push]
    default = current

[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    lol = log --oneline --graph --all
    last = log -1 HEAD
```

### .gitignore Additions
```
# Fichiers de développement
.env.local
.env.development
.env.test

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
```

## 🆘 Troubleshooting

### Problèmes Communs
```bash
# Permission denied
git config --global --unset http.proxy
git config --global --unset https.proxy

# Détaché HEAD
git checkout dev

# Conflicts non résolus
git status # voir les fichiers en conflit
# Éditer les fichiers, puis:
git add .
git commit -m "fix: resolve conflicts"
```

### Récupération après Erreur
```bash
# Revenir à un commit spécifique
git reflog
git reset --hard COMMIT_HASH

# Forcer push (seulement si nécessaire)
git push origin feature/branche --force
```

---

*Dernière mise à jour: $(date +%Y-%m-%d)*  
*Pour support: contacter Mayele ou consulter la documentation*
