
import requests
from django.conf import settings


class NkenneAIError(Exception):
    """Raised when the Nkenne AI translation request fails."""


def translate_text(
    text: str,
    from_language: str,
    to_language: str,
) -> str:
    """Translate text using the Nkenne AI API."""

    api_key = getattr(settings, "NKENNE_AI_API_KEY", None)
    api_url = getattr(settings, "NKENNE_AI_API_URL", None)

    if not api_key or not api_url:
        raise NkenneAIError(
            "Nkenne AI API key or URL is not configured."
        )

    payload = {
        "text": text,
        "fromLanguage": from_language,
        "toLanguage": to_language,
    }

    headers = {
        "Authorization": api_key,
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(
            api_url,
            headers=headers,
            json=payload,
            timeout=30,
        )
        response.raise_for_status()
        result = response.json()

    except requests.exceptions.RequestException as exc:
        raise NkenneAIError(
            "The Nkenne AI request failed."
        ) from exc

    except ValueError as exc:
        raise NkenneAIError(
            "Nkenne AI returned an invalid JSON response."
        ) from exc

    translated_text = result.get("translatedText")

    if not isinstance(translated_text, str) or not translated_text.strip():
        raise NkenneAIError(
            "The API response did not contain translated text."
        )

    return translated_text
