from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings


def get_llm():
    if settings.GOOGLE_API_KEY:
        return ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0
        )

    raise ValueError("GOOGLE_API_KEY not configured")