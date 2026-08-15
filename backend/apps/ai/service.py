from django.conf import settings
from openai import OpenAI

from .models import ChatMessage
from .prompts import SYSTEM_PROMPT


class AIService:

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1",
        )

    def build_messages(self, user):
        history = (
            ChatMessage.objects
            .filter(user=user)
            .order_by("created_at")
        )

        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            }
        ]

        for chat in history:
            messages.append(
                {
                    "role": chat.role,
                    "content": chat.content,
                }
            )

        return messages

    def chat(self, user, message):

        messages = self.build_messages(user)

        messages.append(
            {
                "role": "user",
                "content": message,
            }
        )

        response = self.client.chat.completions.create(
            model=settings.OPENROUTER_MODEL,
            messages=messages,
            temperature=0.3,
            max_tokens=1000,
        )

        return response.choices[0].message.content