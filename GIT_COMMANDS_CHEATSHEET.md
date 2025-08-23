# 📋 Commandes Git Complètes - HumanOS BizIdea

## 🚀 Configuration Initiale

### Premier setup du projet

```bash
# Cloner le dépôt
git clone https://github.com/humanrepo/bizidea.git
cd bizidea

# Configurer l'utilisateur (une fois)
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"

# Vérifier la configuration
git config --list
```

### Connexion au remote

```bash
# Vérifier les remotes existants
git remote -v

# Ajouter un remote (si nécessaire)
git remote add origin https://github.com/humanrepo/bizidea.git

# Récupérer les dernières modifications
git fetch --all
```

## 🌿 Gestion des Branches

### Branches principales

```bash
# Voir toutes les branches
git branch -a

# Basculer sur la branche dev
git checkout dev

# Récupérer les dernières modifications de dev
git pull origin dev

# Créer une nouvelle branche de feature
git checkout -b feat/nom-de-la-fonctionnalite

# Créer une branche de correction
git checkout -b fix/nom-du-bug
```

### Convention de nommage des branches

- `feat/` - Nouvelles fonctionnalités
- `fix/` - Corrections de bugs
- `docs/` - Documentation
- `style/` - Formatage du code
- `refactor/` - Refactorisation
- `test/` - Tests
- `chore/` - Tâches de maintenance

Exemple: `feat/user-authentication`

## 💾 Travail Quotidien

### Commits

```bash
# Voir les changements
git status
git diff

# Ajouter des fichiers spécifiques
git add chemin/vers/fichier.js

# Ajouter tous les changements
git add .

# Commit avec message conventionnel
git commit -m "feat: ajouter l'authentification Google"
git commit -m "fix: corriger le bug de chargement"
git commit -m "docs: mettre à jour le README"
```

### Convention des messages de commit

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage du code
- `refactor:` Refactorisation
- `test:` Tests
- `chore:` Tâches de maintenance

### Push des changements

```bash
# Premier push d'une nouvelle branche
git push -u origin feat/nom-branche

# Push subsequent
git push

# Forcer le push (seulement si nécessaire)
git push --force-with-lease
```

## 🔀 Pull Requests & Fusion

### Préparation de la PR

```bash
# S'assurer d'être à jour avec dev
git checkout dev
git pull origin dev

# Rebaser sa branche sur dev
git checkout feat/nom-branche
git rebase dev

# Résoudre les conflits si nécessaire
git add .
git rebase --continue

# Push après rebase
git push --force-with-lease
```

### Processus de review

```bash
# Récupérer les feedbacks
git checkout feat/nom-branche
git pull origin feat/nom-branche

# Faire les modifications demandées
git add .
git commit -m "fix: adresser les commentaires review"

# Push les corrections
git push
```

## 🆘 Commandes Utiles

### Annulation & Correction

```bash
# Annuler les modifications non commitées
git restore chemin/vers/fichier.js
git restore .

# Modifier le dernier commit
git commit --amend

# Déplacer le dernier commit vers une nouvelle branche
git branch -m nouvelle-branche
git reset --hard origin/dev

# Reset complet
git reset --hard HEAD
```

### Stash

```bash
# Sauvegarder les changements temporairement
git stash

# Voir les stashes
git stash list

# Récupérer un stash
git stash pop
git stash apply

# Supprimer un stash
git stash drop
```

### Historique & Logs

```bash
# Voir l'historique des commits
git log --oneline --graph -10

# Voir les changements d'un commit
git show commit-hash

# Chercher dans l'historique
git log --grep="texte-recherche"

# Voir qui a modifié un fichier
git blame chemin/vers/fichier.js
```

## ⚙️ Aliases Recommandés

Ajouter à `~/.gitconfig` :

```ini
[alias]
  st = status
  cm = commit -m
  co = checkout
  br = branch
  lg = log --oneline --graph --decorate --all
  last = log -1 HEAD
  undo = reset HEAD~1
  amend = commit --amend --no-edit
  cleanup = "!git fetch --prune && git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d"
```

## 🚨 Bonnes Pratiques

### À Faire ✅

- ✅ Toujours pull avant de commencer à travailler
- ✅ Utiliser des branches feature pour chaque changement
- ✅ Commit souvent avec des messages descriptifs
- ✅ Tester avant de push
- ✅ Rebaser sur dev avant de créer une PR

### À Éviter ❌

- ❌ Commit directement sur main/dev
- ❌ Force push sur les branches partagées
- ❌ Commit de code non testé
- ❌ Messages de commit vagues
- ❌ PRs avec des conflits non résolus

## 🎯 Workflow Complet

1. **Préparation**

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/ma-nouvelle-fonction
   ```

2. **Développement**

   ```bash
   # Faire les modifications
   git add .
   git commit -m "feat: ajouter nouvelle fonctionnalité"
   git push -u origin feat/ma-nouvelle-fonction
   ```

3. **Pull Request**

   - Aller sur GitHub
   - Créer une Pull Request vers `dev`
   - Attendre les reviews

4. **Corrections**

   ```bash
   git checkout feat/ma-nouvelle-fonction
   git pull origin feat/ma-nouvelle-fonction
   # Faire les corrections
   git add .
   git commit -m "fix: adresser les commentaires"
   git push
   ```

5. **Nettoyage**
   ```bash
   # Après merge de la PR
   git checkout dev
   git pull origin dev
   git branch -d feat/ma-nouvelle-fonction
   git push origin --delete feat/ma-nouvelle-fonction
   ```

---

**💡 Conseil Pro :** Utilisez les aliases Git pour gagner du temps !

**🚀 Happy Coding !** - L'équipe HumanOS
