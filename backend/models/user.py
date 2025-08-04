from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Enum as SQLEnum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from core.database import Base
import enum

class UserRole(enum.Enum):
    USER = "user"
    PREMIUM = "premium"
    ADMIN = "admin"

class UserStatus(enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    
    # Profile
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    location = Column(String(200), nullable=True)
    country_code = Column(String(2), nullable=True)
    timezone = Column(String(50), default="UTC")
    language = Column(String(5), default="fr")
    
    # Status & Role
    role = Column(SQLEnum(UserRole), default=UserRole.USER)
    status = Column(SQLEnum(UserStatus), default=UserStatus.ACTIVE)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    
    # Preferences
    notification_email = Column(Boolean, default=True)
    notification_push = Column(Boolean, default=True)
    marketing_emails = Column(Boolean, default=False)
    
    # Tracking
    last_login = Column(DateTime(timezone=True), nullable=True)
    login_count = Column(Integer, default=0)
    ideas_generated = Column(Integer, default=0)
    premium_until = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    business_ideas = relationship("BusinessIdea", back_populates="creator")
    community_posts = relationship("CommunityPost", back_populates="author")
    chat_sessions = relationship("ChatSession", back_populates="user")
    
    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"