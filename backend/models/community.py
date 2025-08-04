from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Enum as SQLEnum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from core.database import Base
import enum

class PostType(enum.Enum):
    DISCUSSION = "discussion"
    IDEA_FEEDBACK = "idea_feedback"
    SUCCESS_STORY = "success_story"
    QUESTION = "question"
    RESOURCE = "resource"
    ANNOUNCEMENT = "announcement"

class PostStatus(enum.Enum):
    ACTIVE = "active"
    HIDDEN = "hidden"
    DELETED = "deleted"
    PINNED = "pinned"

class CommunityPost(Base):
    __tablename__ = "community_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    business_idea_id = Column(Integer, ForeignKey("business_ideas.id"), nullable=True)
    
    # Content
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    post_type = Column(SQLEnum(PostType), default=PostType.DISCUSSION)
    tags = Column(String(500), nullable=True)  # Comma-separated tags
    
    # Engagement
    views_count = Column(Integer, default=0)
    likes_count = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    shares_count = Column(Integer, default=0)
    
    # Status
    status = Column(SQLEnum(PostStatus), default=PostStatus.ACTIVE)
    is_featured = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    author = relationship("User", back_populates="community_posts")
    business_idea = relationship("BusinessIdea", back_populates="community_posts")
    comments = relationship("PostComment", back_populates="post", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<CommunityPost(id={self.id}, title='{self.title}', type='{self.post_type}')>"

class PostComment(Base):
    __tablename__ = "post_comments"
    
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("community_posts.id"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    parent_id = Column(Integer, ForeignKey("post_comments.id"), nullable=True)  # For replies
    
    # Content
    content = Column(Text, nullable=False)
    
    # Engagement
    likes_count = Column(Integer, default=0)
    
    # Status
    is_deleted = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    post = relationship("CommunityPost", back_populates="comments")
    author = relationship("User")
    replies = relationship("PostComment", remote_side=[id])
    
    def __repr__(self):
        return f"<PostComment(id={self.id}, post_id={self.post_id})>"

class UserFollow(Base):
    __tablename__ = "user_follows"
    
    id = Column(Integer, primary_key=True, index=True)
    follower_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    following_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<UserFollow(follower_id={self.follower_id}, following_id={self.following_id})>"