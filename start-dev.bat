@echo off
echo ========================================
echo 🚀 Démarrage de Business Idea Generator
echo ========================================

echo 📦 Installation des dépendances backend...
cd backend
npm install

echo 📦 Installation des dépendances frontend...
cd ../frontend
npm install

echo 🌐 Démarrage du backend...
start cmd /k "cd backend && npm run dev"

echo 🎨 Démarrage du frontend...
start cmd /k "cd frontend && npm run dev"

echo ========================================
echo ✅ Application démarrée !
echo 📱 Frontend: http://localhost:3000
echo 🔗 Backend: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/api/docs
echo ========================================
pause
