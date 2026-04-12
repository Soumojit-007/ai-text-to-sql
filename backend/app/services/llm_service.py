from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
import random
from tenacity import retry , stop_after_attempt , wait_fixed

@retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
def get_llm():
    keys = settings.api_keys_list
    key = random.choice(keys)

    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0,
        google_api_key=key
    )