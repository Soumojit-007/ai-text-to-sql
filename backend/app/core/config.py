from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "AI Data Copilot"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str

    # Redis
    REDIS_URL: str

    # LLM (MULTI KEY SUPPORT)
    GOOGLE_API_KEYS: str  # comma-separated keys

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"

    # 🔥 Convert string → list
    @property
    def api_keys_list(self) -> List[str]:
        return [key.strip() for key in self.GOOGLE_API_KEYS.split(",")]


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()