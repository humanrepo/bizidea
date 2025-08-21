@echo off
chcp 65001 > nul
echo ========================================
echo    HUMANOS BIZIDEA - FRONTEND DEV
echo ========================================
echo.

:menu
echo [1] Lancer le serveur de développement
echo [2] Installer les dépendances
echo [3] Vérifier la qualité du code
echo [4] Lancer les tests
echo [5] Build production
echo [6] Git status et mise à jour
echo [7] Audit Lighthouse
echo [8] Quitter
echo.
set /p choice="Choisissez une option (1-8): "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto install
if "%choice%"=="3" goto quality
if "%choice%"=="4" goto test
if "%choice%"=="5" goto build
if "%choice%"=="6" goto gitstatus
if "%choice%"=="7" goto lighthouse
if "%choice%"=="8" goto exit

echo Option invalide, veuillez réessayer.
echo.
goto menu

:dev
echo.
echo 🚀 Lancement du serveur de développement...
cd frontend
npm run dev
goto menu

:install
echo.
echo 📦 Installation des dépendances...
cd frontend
npm install
echo ✅ Dépendances installées avec succès!
goto menu

:quality
echo.
echo 🔍 Vérification de la qualité du code...
cd frontend
echo.
echo 📝 Linting...
npm run lint
echo.
echo 🔮 Vérification TypeScript...
npm run type-check
echo.
echo 🎨 Formatage...
npm run format
echo.
echo ✅ Qualité du code vérifiée!
goto menu

:test
echo.
echo 🧪 Lancement des tests...
cd frontend
npm run test
goto menu

:build
echo.
echo 🏗️  Build production...
cd frontend
npm run build
echo.
echo 📦 Build terminé! Dossier 'dist' créé.
goto menu

:gitstatus
echo.
echo 📊 Status Git...
git status
echo.
echo 🔄 Mise à jour depuis origin/dev...
git fetch origin
git merge origin/dev
echo.
echo ✅ Mise à jour terminée!
goto menu

:lighthouse
echo.
echo 📊 Audit Lighthouse...
echo Installation de Lighthouse si nécessaire...
npm install -g lighthouse
echo.
echo 🎯 Lancement de l'audit...
lighthouse http://localhost:3000 --view --output html --output-path ./lighthouse-report.html
echo.
echo 📋 Rapport généré: lighthouse-report.html
goto menu

:exit
echo.
echo 👋 Au revoir! Bon développement sur HumanOS BizIdea!
echo.
pause
exit
