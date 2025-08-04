from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    
    # App Settings
    APP_NAME: str = "Business Idea Generator"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/business_ideas_db"
    
    # JWT
    SECRET_KEY: str = "your-super-secret-jwt-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # OpenAI
    OPENAI_API_KEY: str = ""
    MODEL_NAME: str = "gpt-4-turbo-preview"
    MAX_TOKENS: int = 2000
    TEMPERATURE: float = 0.7
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # Email
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    
    # External APIs
    TWITTER_BEARER_TOKEN: str = ""
    GOOGLE_TRENDS_API_KEY: str = ""
    
    # Scraping
    USER_AGENT: str = "BusinessIdeaBot/1.0"
    REQUEST_DELAY: int = 1
    
    class Config:
        case_sensitive = True

settings = Settings()