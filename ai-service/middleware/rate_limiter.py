import time
import redis
from functools import wraps
from typing import Optional
import os

class RateLimiter:
    def __init__(self, redis_client: Optional[redis.Redis] = None):
        self.redis_client = redis_client or redis.from_url(
            os.getenv("REDIS_URL", "redis://localhost:6379")
        )
        
    def limit_requests(self, key: str, max_requests: int, window_seconds: int):
        """Rate limit requests using sliding window"""
        def decorator(func):
            @wraps(func)
            async def wrapper(*args, **kwargs):
                current_time = int(time.time())
                window_start = current_time - window_seconds
                
                # Create Redis key
                redis_key = f"rate_limit:{key}"
                
                # Remove old entries
                self.redis_client.zremrangebyscore(redis_key, 0, window_start)
                
                # Count current requests
                current_count = self.redis_client.zcard(redis_key)
                
                if current_count >= max_requests:
                    raise Exception(f"Rate limit exceeded. Max {max_requests} requests per {window_seconds} seconds")
                
                # Add current request
                self.redis_client.zadd(redis_key, {str(current_time): current_time})
                self.redis_client.expire(redis_key, window_seconds)
                
                return await func(*args, **kwargs)
            return wrapper
        return decorator

class OpenAIRateLimiter:
    def __init__(self):
        self.last_request_time = 0
        self.min_interval = 1.0  # Minimum 1 second between requests
        
    def wait_if_needed(self):
        """Simple rate limiting for OpenAI API"""
        current_time = time.time()
        time_since_last = current_time - self.last_request_time
        
        if time_since_last < self.min_interval:
            sleep_time = self.min_interval - time_since_last
            time.sleep(sleep_time)
            
        self.last_request_time = time.time()
