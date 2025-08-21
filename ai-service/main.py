from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import openai
from datetime import datetime
import os
import logging
from dotenv import load_dotenv
from middleware.rate_limiter import OpenAIRateLimiter
from utils.retry_handler import RetryHandler
from utils.cache_manager import CacheManager, BusinessIdeaCache

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Chargement des variables d'environnement
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI(title="Business Idea AI Service")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèles de données
class BusinessIdeaInput(BaseModel):
    industry: str
    userInterests: List[str]
    marketConstraints: Optional[List[str]]
    userExperience: Optional[str]

class BusinessIdeaOutput(BaseModel):
    title: str
    description: str
    marketAnalysis: dict
    viabilityScore: float
    recommendations: List[str]
    timestamp: datetime = datetime.now()

# Initialize rate limiter, retry handler, and cache
rate_limiter = OpenAIRateLimiter()
cache_manager = CacheManager()
idea_cache = BusinessIdeaCache(cache_manager)

# Routes API
@app.post("/api/generate-idea", response_model=BusinessIdeaOutput)
async def generate_business_idea(input_data: BusinessIdeaInput):
    try:
        # Check cache first
        input_dict = input_data.dict()
        cached_idea = idea_cache.get_cached_idea(input_dict)
        
        if cached_idea:
            logger.info("Returning cached business idea")
            return BusinessIdeaOutput(**cached_idea)
        
        # Rate limiting
        rate_limiter.wait_if_needed()
        
        # Contexte pour GPT
        prompt = f"""
        Generate a business idea for someone in the {input_data.industry} industry.
        Their interests include: {', '.join(input_data.userInterests)}
        Experience level: {input_data.userExperience or 'Not specified'}
        Market constraints: {', '.join(input_data.marketConstraints) if input_data.marketConstraints else 'None'}
        
        Format the response as a detailed business proposition including:
        1. Concept overview
        2. Market potential
        3. Key success factors
        4. Initial steps
        """

        # Appel à GPT-4 with retry logic
        async def make_ai_request():
            return openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "system", "content": "You are a business strategy AI expert."},
                         {"role": "user", "content": prompt}]
            )

        response = await RetryHandler.exponential_backoff_retry(make_ai_request)

        # Traitement de la réponse
        idea = response.choices[0].message.content

        # Analyse de viabilité with retry logic
        async def make_viability_request():
            viability_prompt = f"Analyze the viability of this business idea: {idea}"
            return openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "system", "content": "You are a market analysis expert."},
                         {"role": "user", "content": viability_prompt}]
            )

        viability_response = await RetryHandler.exponential_backoff_retry(make_viability_request)

        # Construction de la réponse
        result = BusinessIdeaOutput(
            title=idea.split('\n')[0],
            description=idea,
            marketAnalysis={
                "analysis": viability_response.choices[0].message.content,
                "timestamp": datetime.now().isoformat()
            },
            viabilityScore=0.85,
            recommendations=["Recommendation 1", "Recommendation 2", "Recommendation 3"]
        )
        
        # Cache the result
        idea_cache.cache_idea(input_dict, result.dict())
        
        return result

    except Exception as e:
        logger.error(f"Error generating business idea: {str(e)}")
        
        # Handle rate limit errors specifically
        error_message = str(e).lower()
        if 'rate limit' in error_message or '429' in error_message:
            raise HTTPException(
                status_code=429,
                detail="AI service rate limit exceeded. Please try again in a few moments."
            )
        elif 'quota' in error_message:
            raise HTTPException(
                status_code=429,
                detail="AI service quota exceeded. Please check your billing details or try again later."
            )
        else:
            raise HTTPException(status_code=500, detail=str(e))

# Lancement du serveur
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
