import asyncio
import time
import random
from typing import Callable, Any
import logging

logger = logging.getLogger(__name__)

class RetryHandler:
    @staticmethod
    async def exponential_backoff_retry(
        func: Callable,
        max_retries: int = 3,
        base_delay: float = 1.0,
        max_delay: float = 60.0,
        exponential_base: float = 2.0,
        jitter: bool = True
    ) -> Any:
        """
        Retry a function with exponential backoff
        
        Args:
            func: The function to retry
            max_retries: Maximum number of retry attempts
            base_delay: Initial delay between retries
            max_delay: Maximum delay between retries
            exponential_base: Base for exponential calculation
            jitter: Add random jitter to delay
        """
        for attempt in range(max_retries + 1):
            try:
                return await func()
            except Exception as e:
                if attempt == max_retries:
                    logger.error(f"Max retries ({max_retries}) exceeded. Final error: {str(e)}")
                    raise
                
                # Calculate delay with exponential backoff
                delay = min(
                    base_delay * (exponential_base ** attempt),
                    max_delay
                )
                
                # Add jitter to prevent thundering herd
                if jitter:
                    delay *= (0.5 + random.random())
                
                logger.warning(f"Attempt {attempt + 1} failed: {str(e)}. Retrying in {delay:.2f} seconds...")
                await asyncio.sleep(delay)

    @staticmethod
    def is_rate_limit_error(error: Exception) -> bool:
        """Check if error is a rate limit error"""
        error_str = str(error).lower()
        return any(keyword in error_str for keyword in [
            'rate limit', '429', 'too many requests', 'quota exceeded',
            'resource exhausted', 'try again later'
        ])

class OpenAIClientWithRetry:
    def __init__(self, client):
        self.client = client
        
    async def create_chat_completion(self, **kwargs):
        """Create chat completion with retry logic"""
        async def _make_request():
            return self.client.ChatCompletion.create(**kwargs)
            
        return await RetryHandler.exponential_backoff_retry(
            _make_request,
            max_retries=3,
            base_delay=2.0
        )
