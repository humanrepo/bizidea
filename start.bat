@echo off
echo Démarrage du backend et frontend...
echo.

echo Démarrage du backend sur le port 5000...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Démarrage du frontend sur le port 3000...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Les deux services sont en cours de démarrage...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause