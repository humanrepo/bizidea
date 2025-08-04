from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey, JSON, Enum as SQLEnum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from core.database import Base
import enum

class IdeaStatus(enum.Enum):
    DRAFT = "draft"
    ANALYZING = "analyzing"
    VALIDATED = "validated"
    REJECTED = "rejected"
    ARCHIVED = "archived"

class IdeaCategory(enum.Enum):
    TECH = "technology"
    HEALTH = "health"
    EDUCATION = "education"
    FINANCE = "finance"
    ECOMMERCE = "ecommerce"
    SAAS = "saas"
    MARKETPLACE = "marketplace"
    SOCIAL = "social"
    GAMING = "gaming"
    FOOD = "food"
    TRAVEL = "travel"
    FITNESS = "fitness"
    SUSTAINABILITY = "sustainability"
    OTHER = "other"

class DifficultyLevel(enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"

class BusinessIdea(Base):
    __tablename__ = "business_ideas"
    
    id = Column(Integer, primary_key=True, index=True)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Core Information
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    problem_statement = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)
    target_audience = Column(Text, nullable=False)
    
    # Categorization
    category = Column(SQLEnum(IdeaCategory), nullable=False)
    tags = Column(JSON, default=list)  # List of strings
    industry = Column(String(100), nullable=True)
    
    # Market Analysis
    market_size = Column(Float, nullable=True)  # In millions
    search_volume = Column(Integer, nullable=True)  # Monthly searches
    competition_level = Column(Float, nullable=True)  # 0-10 scale
    trend_score = Column(Float, nullable=True)  # -100 to 100
    
    # Feasibility Analysis
    difficulty_level = Column(SQLEnum(DifficultyLevel), nullable=True)
    estimated_cost = Column(Float, nullable=True)  # In euros
    time_to_market = Column(Integer, nullable=True)  # In months
    required_skills = Column(JSON, default=list)  # List of skills
    
    # Validation Data
    validation_sources = Column(JSON, default=list)  # URLs and sources
    similar_products = Column(JSON, default=list)  # Competitor analysis
    user_feedback = Column(JSON, default=list)  # Community feedback
    
    # AI Analysis
    ai_confidence = Column(Float, nullable=True)  # 0-1 confidence score
    ai_reasoning = Column(Text, nullable=True)
    keywords = Column(JSON, default=list)  # SEO keywords
    
    # Geographic Data
    target_countries = Column(JSON, default=list)  # Country codes
    geographic_restrictions = Column(Text, nullable=True)
    
    # Status & Tracking
    status = Column(SQLEnum(IdeaStatus), default=IdeaStatus.DRAFT)
    is_public = Column(Boolean, default=False)
    views_count = Column(Integer, default=0)
    likes_count = Column(Integer, default=0)
    bookmarks_count = Column(Integer, default=0)
    
    # Revenue Model
    revenue_model = Column(String(100), nullable=True)
    pricing_strategy = Column(Text, nullable=True)
    revenue_projection = Column(JSON, default=dict)  # Year-wise projections
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    analyzed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    creator = relationship("User", back_populates="business_ideas")
    community_posts = relationship("CommunityPost", back_populates="business_idea")
    
    def __repr__(self):
        return f"<BusinessIdea(id={self.id}, title='{self.title}', status='{self.status}')>"
    
    @property
    def overall_score(self) -> float:
        """Calculate overall viability score (0-100)"""
        scores = []
        
        if self.ai_confidence:
            scores.append(self.ai_confidence * 100)
        
        if self.trend_score:
            scores.append((self.trend_score + 100) / 2)  # Normalize -100,100 to 0,100
            
        if self.competition_level:
            scores.append((10 - self.competition_level) * 10)  # Lower competition = higher score
            
        return sum(scores) / len(scores) if scores else 0