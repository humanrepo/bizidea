from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, Enum as SQLEnum, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from core.database import Base
import enum

class MessageRole(enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"

class ChatSessionStatus(enum.Enum):
    ACTIVE = "active"
    ARCHIVED = "archived"
    DELETED = "deleted"

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Session Info
    title = Column(String(200), nullable=True)  # Auto-generated or user-defined
    context = Column(Text, nullable=True)  # Business context or topic
    session_type = Column(String(50), default="general")  # general, idea_validation, market_analysis, etc.
    
    # Status
    status = Column(SQLEnum(ChatSessionStatus), default=ChatSessionStatus.ACTIVE)
    is_pinned = Column(Boolean, default=False)
    
    # Metadata
    message_count = Column(Integer, default=0)
    total_tokens = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_message_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="chat_sessions")
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<ChatSession(id={self.id}, user_id={self.user_id}, title='{self.title}')>"

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=False)
    
    # Message Content
    role = Column(SQLEnum(MessageRole), nullable=False)
    content = Column(Text, nullable=False)
    
    # AI Metadata
    model_used = Column(String(50), nullable=True)
    tokens_used = Column(Integer, nullable=True)
    response_time = Column(Integer, nullable=True)  # in milliseconds
    
    # Additional Data
    attachments = Column(JSON, default=list)  # File attachments, images, etc.
    metadata = Column(JSON, default=dict)  # Additional context, citations, etc.
    
    # Status
    is_edited = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    session = relationship("ChatSession", back_populates="messages")
    
    def __repr__(self):
        return f"<ChatMessage(id={self.id}, session_id={self.session_id}, role='{self.role}')>"

class AIPromptTemplate(Base):
    __tablename__ = "ai_prompt_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Template Info
    name = Column(String(100), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    category = Column(String(50), nullable=False)  # idea_generation, market_analysis, etc.
    
    # Template Content
    system_prompt = Column(Text, nullable=False)
    user_prompt_template = Column(Text, nullable=False)
    
    # Configuration
    model_config = Column(JSON, default=dict)  # temperature, max_tokens, etc.
    required_variables = Column(JSON, default=list)  # Variables needed in template
    
    # Status
    is_active = Column(Boolean, default=True)
    version = Column(String(10), default="1.0")
    
    # Usage Stats
    usage_count = Column(Integer, default=0)
    success_rate = Column(Float, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<AIPromptTemplate(id={self.id}, name='{self.name}', category='{self.category}')>"