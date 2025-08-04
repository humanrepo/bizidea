import openai
from typing import Dict, List, Any, Optional
import json
import asyncio
from datetime import datetime
import logging

from core.config import settings
from services.scraping_service import ScrapingService
from services.market_analysis_service import MarketAnalysisService

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
        self.scraping_service = ScrapingService()
        self.market_service = MarketAnalysisService()
        
    async def generate_business_ideas(
        self,
        interests: List[str],
        location: str,
        budget_range: str,
        difficulty_level: str,
        count: int = 5
    ) -> List[Dict[str, Any]]:
        """Génère des idées business basées sur des critères utilisateur"""
        
        try:
            # 1. Scraper les tendances actuelles
            trends_data = await self.scraping_service.get_trending_topics(location)
            
            # 2. Analyser les problèmes récurrents en ligne
            problems_data = await self.scraping_service.find_common_problems(interests)
            
            # 3. Construire le prompt IA
            system_prompt = self._build_idea_generation_prompt()
            user_prompt = self._build_user_context_prompt(
                interests, location, budget_range, difficulty_level, 
                trends_data, problems_data, count
            )
            
            # 4. Appeler OpenAI
            response = await self._call_openai(
                system_prompt=system_prompt,
                user_prompt=user_prompt,
                temperature=0.8,
                max_tokens=3000
            )
            
            # 5. Parser et structurer la réponse
            ideas = self._parse_ideas_response(response)
            
            # 6. Enrichir chaque idée avec des données marché
            enriched_ideas = []
            for idea in ideas:
                enriched_idea = await self._enrich_idea_with_market_data(idea)
                enriched_ideas.append(enriched_idea)
            
            return enriched_ideas
            
        except Exception as e:
            logger.error(f"Erreur génération idées: {e}")
            return []
    
    async def analyze_idea_potential(self, idea_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyse le potentiel d'une idée business"""
        
        try:
            # 1. Analyse de marché
            market_analysis = await self.market_service.analyze_market(
                idea_data.get("title", ""),
                idea_data.get("description", ""),
                idea_data.get("target_countries", ["FR"])
            )
            
            # 2. Analyse de la concurrence
            competition_analysis = await self.market_service.analyze_competition(
                idea_data.get("keywords", [])
            )
            
            # 3. Analyse IA approfondie
            ai_analysis = await self._deep_analyze_idea(idea_data)
            
            # 4. Calcul du score de viabilité
            viability_score = self._calculate_viability_score(
                market_analysis, competition_analysis, ai_analysis
            )
            
            return {
                "market_analysis": market_analysis,
                "competition_analysis": competition_analysis,
                "ai_analysis": ai_analysis,
                "viability_score": viability_score,
                "recommendations": self._generate_recommendations(
                    market_analysis, competition_analysis, ai_analysis
                ),
                "analyzed_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Erreur analyse potentiel: {e}")
            return {}
    
    async def chat_with_mentor(
        self, 
        message: str, 
        conversation_history: List[Dict[str, str]],
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Chat avec le mentor IA"""
        
        try:
            # Construire le contexte du mentor
            system_prompt = self._build_mentor_system_prompt(context)
            
            # Préparer l'historique de conversation
            messages = [{"role": "system", "content": system_prompt}]
            
            # Ajouter l'historique
            for msg in conversation_history[-10:]:  # Garder les 10 derniers messages
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
            
            # Ajouter le nouveau message
            messages.append({"role": "user", "content": message})
            
            # Appeler OpenAI
            response = await openai.ChatCompletion.acreate(
                model=settings.MODEL_NAME,
                messages=messages,
                temperature=0.7,
                max_tokens=1500
            )
            
            ai_response = response.choices[0].message.content
            
            return {
                "response": ai_response,
                "tokens_used": response.usage.total_tokens,
                "model_used": settings.MODEL_NAME,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Erreur chat mentor: {e}")
            return {
                "response": "Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ?",
                "error": True
            }
    
    def _build_idea_generation_prompt(self) -> str:
        return """Tu es un expert en génération d'idées business et en entrepreneuriat. 
        Ta mission est de générer des idées business innovantes, viables et basées sur des besoins réels détectés en ligne.
        
        Critères pour une bonne idée:
        - Résout un problème réel et récurrent
        - A un marché potentiel identifiable
        - Est réalisable avec les ressources disponibles
        - A un potentiel de rentabilité
        - S'appuie sur des tendances actuelles
        
        Format de réponse: JSON avec les champs suivants pour chaque idée:
        - title: Titre accrocheur
        - description: Description détaillée (200-300 mots)
        - problem_statement: Problème résolu
        - solution: Solution proposée
        - target_audience: Audience cible
        - revenue_model: Modèle économique
        - estimated_cost: Coût estimé de lancement
        - time_to_market: Temps de développement en mois
        - difficulty_level: beginner/intermediate/advanced/expert
        - keywords: Mots-clés SEO (liste)
        - category: Catégorie business
        """
    
    def _build_user_context_prompt(
        self, interests, location, budget_range, difficulty_level, 
        trends_data, problems_data, count
    ) -> str:
        return f"""
        Génère {count} idées business basées sur:
        
        PROFIL UTILISATEUR:
        - Intérêts: {', '.join(interests)}
        - Localisation: {location}
        - Budget: {budget_range}
        - Niveau: {difficulty_level}
        
        DONNÉES TENDANCES ACTUELLES:
        {json.dumps(trends_data, indent=2)}
        
        PROBLÈMES DÉTECTÉS EN LIGNE:
        {json.dumps(problems_data, indent=2)}
        
        Instructions spéciales:
        - Utilise les tendances et problèmes fournis
        - Adapte à la localisation et au budget
        - Respecte le niveau de difficulté demandé
        - Sois créatif mais réaliste
        - Fournis des idées diverses et complémentaires
        """
    
    def _build_mentor_system_prompt(self, context: Optional[Dict[str, Any]]) -> str:
        base_prompt = """Tu es un mentor entrepreneur expérimenté et bienveillant. 
        Tu aides les entrepreneurs à développer leurs idées, résoudre leurs problèmes et prendre les bonnes décisions.
        
        Ton style:
        - Bienveillant et encourageant
        - Pragmatique et orienté action
        - Partage des exemples concrets
        - Pose des questions pertinentes
        - Donne des conseils actionnables
        
        Domaines d'expertise:
        - Validation d'idées business
        - Stratégie marketing
        - Modèles économiques
        - Financement et levée de fonds
        - Développement produit
        - Gestion d'équipe
        - Analyse de marché
        """
        
        if context:
            base_prompt += f"\n\nCONTEXTE ACTUEL:\n{json.dumps(context, indent=2)}"
        
        return base_prompt
    
    async def _call_openai(
        self, 
        system_prompt: str, 
        user_prompt: str, 
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> str:
        """Appel générique à OpenAI"""
        
        response = await openai.ChatCompletion.acreate(
            model=settings.MODEL_NAME,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        return response.choices[0].message.content
    
    def _parse_ideas_response(self, response: str) -> List[Dict[str, Any]]:
        """Parse la réponse IA en structure de données"""
        try:
            # Nettoyer la réponse si nécessaire
            if "```json" in response:
                response = response.split("```json")[1].split("```")[0]
            
            ideas = json.loads(response)
            
            # Valider la structure
            if isinstance(ideas, dict) and "ideas" in ideas:
                ideas = ideas["ideas"]
            
            return ideas if isinstance(ideas, list) else [ideas]
            
        except json.JSONDecodeError:
            logger.error(f"Erreur parsing JSON: {response}")
            return []
    
    async def _enrich_idea_with_market_data(self, idea: Dict[str, Any]) -> Dict[str, Any]:
        """Enrichit une idée avec des données marché"""
        
        # Recherche de volume
        search_volume = await self.market_service.get_search_volume(
            idea.get("keywords", [])
        )
        
        # Analyse des tendances
        trend_score = await self.market_service.get_trend_score(
            idea.get("keywords", [])
        )
        
        # Enrichir l'idée
        idea.update({
            "search_volume": search_volume,
            "trend_score": trend_score,
            "enriched_at": datetime.utcnow().isoformat()
        })
        
        return idea
    
    async def _deep_analyze_idea(self, idea_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyse IA approfondie d'une idée"""
        
        prompt = f"""
        Analyse cette idée business en détail:
        
        {json.dumps(idea_data, indent=2)}
        
        Fournis une analyse structurée avec:
        - Strengths: Forces de l'idée
        - Weaknesses: Faiblesses potentielles
        - Opportunities: Opportunités de marché
        - Threats: Menaces et risques
        - Confidence: Score de confiance 0-1
        - Reasoning: Raisonnement détaillé
        - Next_steps: Prochaines étapes recommandées
        
        Format: JSON
        """
        
        response = await self._call_openai(
            system_prompt="Tu es un analyste business expert.",
            user_prompt=prompt,
            temperature=0.3
        )
        
        try:
            return json.loads(response)
        except:
            return {"error": "Erreur parsing analyse"}
    
    def _calculate_viability_score(
        self, 
        market_analysis: Dict, 
        competition_analysis: Dict, 
        ai_analysis: Dict
    ) -> float:
        """Calcule un score de viabilité global"""
        
        scores = []
        
        # Score marché (30%)
        if market_analysis.get("market_size", 0) > 0:
            market_score = min(market_analysis.get("market_size", 0) / 100, 1.0)
            scores.append(market_score * 0.3)
        
        # Score concurrence (25%) - moins de concurrence = meilleur score
        if competition_analysis.get("competition_level"):
            comp_score = (10 - competition_analysis.get("competition_level", 5)) / 10
            scores.append(comp_score * 0.25)
        
        # Score IA (35%)
        if ai_analysis.get("confidence"):
            scores.append(ai_analysis.get("confidence", 0) * 0.35)
        
        # Score tendance (10%)
        if market_analysis.get("trend_score"):
            trend_score = (market_analysis.get("trend_score", 0) + 100) / 200
            scores.append(trend_score * 0.1)
        
        return sum(scores) if scores else 0.5
    
    def _generate_recommendations(
        self, 
        market_analysis: Dict, 
        competition_analysis: Dict, 
        ai_analysis: Dict
    ) -> List[str]:
        """Génère des recommandations basées sur l'analyse"""
        
        recommendations = []
        
        # Recommandations marché
        if market_analysis.get("market_size", 0) < 10:
            recommendations.append("Considérez élargir votre marché cible")
        
        # Recommandations concurrence
        if competition_analysis.get("competition_level", 0) > 7:
            recommendations.append("Marché très concurrentiel - différenciation cruciale")
        
        # Recommandations IA
        if ai_analysis.get("confidence", 0) < 0.6:
            recommendations.append("Validez davantage votre concept auprès des utilisateurs")
        
        return recommendations