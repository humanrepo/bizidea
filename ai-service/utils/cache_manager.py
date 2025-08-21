import hashlib
import json
import redis
import os
from typing import Optional, Any
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class CacheManager:
    def __init__(self, redis_client: Optional[redis.Redis] = None):
        self.redis_client = redis_client or redis.from_url(
            os.getenv("REDIS_URL", "redis://localhost:6379")
        )
        self.default_ttl = 3600  # 1 hour default TTL
        
    def _generate_cache_key(self, prefix: str, data: dict) -> str:
        """Generate a cache key from data"""
        # Create a hash from the data
        data_str = json.dumps(data, sort_keys=True)
        hash_object = hashlib.md5(data_str.encode())
        return f"{prefix}:{hash_object.hexdigest()}"
    
    def get(self, key: str) -> Optional[Any]:
        """Get cached data"""
        try:
            cached_data = self.redis_client.get(key)
            if cached_data:
                return json.loads(cached_data)
            return None
        except Exception as e:
            logger.error(f"Cache get error: {str(e)}")
            return None
    
    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Set cached data with TTL"""
        try:
            ttl = ttl or self.default_ttl
            self.redis_client.setex(
                key,
                ttl,
                json.dumps(value, default=str)
            )
            return True
        except Exception as e:
            logger.error(f"Cache set error: {str(e)}")
            return False
    
    def delete(self, key: str) -> bool:
        """Delete cached data"""
        try:
            return bool(self.redis_client.delete(key))
        except Exception as e:
            logger.error(f"Cache delete error: {str(e)}")
            return False
    
    def exists(self, key: str) -> bool:
        """Check if key exists in cache"""
        try:
            return bool(self.redis_client.exists(key))
        except Exception as e:
            logger.error(f"Cache exists error: {str(e)}")
            return False
    
    def clear_pattern(self, pattern: str) -> int:
        """Clear all keys matching pattern"""
        try:
            keys = self.redis_client.keys(pattern)
            if keys:
                return self.redis_client.delete(*keys)
            return 0
        except Exception as e:
            logger.error(f"Cache clear pattern error: {str(e)}")
            return 0

class BusinessIdeaCache:
    def __init__(self, cache_manager: CacheManager):
        self.cache = cache_manager
        
    def get_cached_idea(self, input_data: dict) -> Optional[dict]:
        """Get cached business idea based on input"""
        cache_key = self.cache._generate_cache_key("business_idea", input_data)
        return self.cache.get(cache_key)
    
    def cache_idea(self, input_data: dict, idea_data: dict, ttl: int = 3600) -> bool:
        """Cache a business idea"""
        cache_key = self.cache._generate_cache_key("business_idea", input_data)
        return self.cache.set(cache_key, idea_data, ttl)
    
    def clear_idea_cache(self) -> int:
        """Clear all cached business ideas"""
        return self.cache.clear_pattern("business_idea:*")
