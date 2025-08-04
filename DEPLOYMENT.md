# 🚀 Guide de Déploiement - Business Idea Generator

Ce guide vous accompagne dans le déploiement de la plateforme Business Idea Generator en production.

## 📋 Prérequis

### Serveur
- **OS**: Ubuntu 20.04+ ou CentOS 8+
- **RAM**: Minimum 4GB (8GB recommandé)
- **CPU**: 2 vCPUs minimum (4 vCPUs recommandé)
- **Stockage**: 50GB SSD minimum
- **Réseau**: Connexion internet stable

### Logiciels
- Docker 20.10+
- Docker Compose 1.29+
- Git
- Nginx (optionnel, inclus dans Docker)
- Certbot pour SSL (Let's Encrypt)

### Services Externes
- **Base de données**: PostgreSQL 15+ (managed ou self-hosted)
- **Cache**: Redis 7+ (managed ou self-hosted)
- **Email**: Service SMTP (Gmail, SendGrid, etc.)
- **IA**: Clé API OpenAI GPT-4
- **Monitoring**: Sentry (optionnel)

## 🔧 Configuration Initiale

### 1. Préparation du serveur

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Installation de Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Installation de Git
sudo apt install git -y

# Installation de Certbot (pour SSL)
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Clone du projet

```bash
# Clone du repository
git clone https://github.com/votre-username/business-idea-generator.git
cd business-idea-generator

# Création des répertoires nécessaires
mkdir -p logs nginx/ssl data/postgres data/redis
```

### 3. Configuration des variables d'environnement

```bash
# Copie du fichier d'environnement
cp backend/.env.example backend/.env

# Édition des variables (voir section suivante)
nano backend/.env
```

## 🔐 Configuration des Variables d'Environnement

### Variables Obligatoires

```env
# Application
APP_NAME="Business Idea Generator"
DEBUG=False

# Base de données (remplacer par vos vraies valeurs)
DATABASE_URL=postgresql://username:password@your-db-host:5432/business_ideas_db

# JWT (générer une clé sécurisée)
SECRET_KEY=your-super-secure-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI (OBLIGATOIRE)
OPENAI_API_KEY=sk-your-openai-api-key-here
MODEL_NAME=gpt-4-turbo-preview

# Redis
REDIS_URL=redis://your-redis-host:6379

# CORS (remplacer par votre domaine)
CORS_ORIGINS=["https://yourdomain.com"]
```

### Variables Optionnelles

```env
# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# APIs externes
TWITTER_BEARER_TOKEN=your-twitter-bearer-token
GOOGLE_TRENDS_API_KEY=your-google-trends-key

# Monitoring
SENTRY_DSN=your-sentry-dsn-here
```

### Génération de clés sécurisées

```bash
# Génération d'une clé secrète JWT
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# Ou avec OpenSSL
openssl rand -base64 32
```

## 🐳 Déploiement avec Docker

### 1. Configuration Docker Compose Production

Créer `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - SECRET_KEY=${SECRET_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DEBUG=False
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.prod.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - backend
      - frontend
    restart: unless-stopped
```

### 2. Configuration Nginx

Créer `nginx/nginx.prod.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:8000;
    }

    upstream frontend {
        server frontend:80;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=30r/s;

    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;
        
        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
        ssl_prefer_server_ciphers off;

        # Security Headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

        # API Routes
        location /api {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Frontend Routes
        location / {
            limit_req zone=general burst=50 nodelay;
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # WebSocket support (pour le chat en temps réel)
        location /ws {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Static files caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://frontend;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. Obtention du certificat SSL

```bash
# Arrêter Nginx temporairement
sudo systemctl stop nginx

# Obtention du certificat Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Vérification du certificat
sudo certbot certificates
```

### 4. Lancement de l'application

```bash
# Build et lancement
docker-compose -f docker-compose.prod.yml up -d --build

# Vérification des logs
docker-compose -f docker-compose.prod.yml logs -f

# Vérification du statut
docker-compose -f docker-compose.prod.yml ps
```

## 🗄️ Configuration Base de Données

### Migration initiale

```bash
# Accès au container backend
docker-compose -f docker-compose.prod.yml exec backend bash

# Création des tables
alembic upgrade head

# Création d'un utilisateur admin (optionnel)
python -c "
from sqlalchemy.orm import sessionmaker
from core.database import engine
from models.user import User
from core.security import hash_password

Session = sessionmaker(bind=engine)
db = Session()

admin_user = User(
    email='admin@yourdomain.com',
    username='admin',
    first_name='Admin',
    last_name='User',
    hashed_password=hash_password('your-secure-password'),
    role='admin',
    is_verified=True
)

db.add(admin_user)
db.commit()
print('Admin user created successfully')
"
```

## 📊 Monitoring et Logs

### 1. Configuration des logs

```bash
# Création du système de rotation des logs
sudo nano /etc/logrotate.d/business-idea-generator
```

Contenu du fichier:
```
/path/to/business-idea-generator/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    postrotate
        docker-compose -f /path/to/business-idea-generator/docker-compose.prod.yml restart backend
    endscript
}
```

### 2. Monitoring avec Prometheus (optionnel)

Ajouter au `docker-compose.prod.yml`:

```yaml
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    restart: unless-stopped

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=your-grafana-password
    volumes:
      - grafana-data:/var/lib/grafana
    restart: unless-stopped

volumes:
  grafana-data:
```

## 🔄 Mise à Jour et Maintenance

### Déploiement d'une nouvelle version

```bash
# Sauvegarde de la base de données
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U postgres business_ideas_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Pull des dernières modifications
git pull origin main

# Rebuild et redémarrage
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Vérification
docker-compose -f docker-compose.prod.yml ps
curl -f https://yourdomain.com/api/health
```

### Sauvegarde automatique

Créer un script de sauvegarde `scripts/backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Sauvegarde base de données
docker-compose -f docker-compose.prod.yml exec -T postgres pg_dump -U postgres business_ideas_db > $BACKUP_DIR/db_backup_$DATE.sql

# Compression
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Nettoyage (garder seulement les 7 derniers jours)
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: db_backup_$DATE.sql.gz"
```

Ajouter au crontab:
```bash
# Sauvegarde quotidienne à 2h du matin
0 2 * * * /path/to/business-idea-generator/scripts/backup.sh
```

## 🔧 Dépannage

### Problèmes courants

1. **Erreur de connexion à la base de données**
   ```bash
   # Vérifier la connectivité
   docker-compose -f docker-compose.prod.yml exec backend python -c "
   from core.database import engine
   try:
       engine.connect()
       print('Database connection successful')
   except Exception as e:
       print(f'Database connection failed: {e}')
   "
   ```

2. **Problème de certificat SSL**
   ```bash
   # Renouvellement du certificat
   sudo certbot renew --dry-run
   sudo certbot renew
   ```

3. **Problème de mémoire**
   ```bash
   # Vérification de l'utilisation mémoire
   docker stats
   
   # Redémarrage des services
   docker-compose -f docker-compose.prod.yml restart
   ```

### Logs utiles

```bash
# Logs de l'application
docker-compose -f docker-compose.prod.yml logs backend

# Logs Nginx
docker-compose -f docker-compose.prod.yml logs nginx

# Logs système
sudo journalctl -u docker
```

## 🚀 Optimisations Performance

### 1. Configuration Redis

```redis
# redis.conf
maxmemory 256mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

### 2. Configuration PostgreSQL

```sql
-- postgresql.conf optimizations
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
```

### 3. Configuration Nginx

```nginx
# Optimisations dans nginx.conf
worker_processes auto;
worker_connections 2048;
keepalive_timeout 65;
client_max_body_size 10M;

# Compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/javascript application/json;
```

## 📞 Support

En cas de problème lors du déploiement:

1. **Vérifiez les logs** en premier
2. **Consultez la documentation** GitHub
3. **Ouvrez un issue** avec les détails de l'erreur
4. **Contactez le support** : support@business-idea-generator.com

---

**Bon déploiement ! 🚀**