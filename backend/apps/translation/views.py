
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_spectacular.utils import extend_schema, OpenApiResponse

from .services import translate_text, NkenneAIError


SUPPORTED_LANGUAGES = [
    "English",
    "Yoruba",
    "Hausa",
    "Igbo",
    "Nigerian Pidgin",
]


# Request serializer
class TranslationRequestSerializer(serializers.Serializer):
    text = serializers.CharField(
        required=True,
        allow_blank=False,
        max_length=5000,
        help_text="The text you want to translate. Maximum 5000 characters.",
    )
    from_language = serializers.ChoiceField(
        choices=SUPPORTED_LANGUAGES,
        default="English",
        help_text="The language of the original text.",
    )
    to_language = serializers.ChoiceField(
        choices=SUPPORTED_LANGUAGES,
        help_text="The language to translate the text into.",
    )


# Response serializers for Swagger documentation
class TranslationResponseSerializer(serializers.Serializer):
    original_text = serializers.CharField()
    translated_text = serializers.CharField()
    from_language = serializers.CharField()
    to_language = serializers.CharField()


class TranslationErrorSerializer(serializers.Serializer):
    error = serializers.CharField()


class TranslationValidationErrorSerializer(serializers.Serializer):
    errors = serializers.DictField(
        child=serializers.ListField(
            child=serializers.CharField()
        )
    )


class TranslateAPIView(APIView):
    @extend_schema(
        operation_id="translate_text",
        summary="Translate text using Nkenne AI",
        description=(
            "Translates text from a source language into a target language "
            "using the Nkenne AI translation API. Both languages must be "
            "supported, and the source and target languages must differ."
        ),
        request=TranslationRequestSerializer,
        responses={
            200: OpenApiResponse(
                response=TranslationResponseSerializer,
                description="Text translated successfully.",
            ),
            400: OpenApiResponse(
                response=TranslationValidationErrorSerializer,
                description=(
                    "Invalid request data, unsupported language, "
                    "or identical source and target languages."
                ),
            ),
            502: OpenApiResponse(
                response=TranslationErrorSerializer,
                description="The Nkenne AI translation service failed.",
            ),
        },
        tags=["Translation"],
    )
    def post(self, request):
        serializer = TranslationRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data

        if data["from_language"] == data["to_language"]:
            return Response(
                {
                    "error": (
                        "Source and target languages must differ."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            translated_text = translate_text(
                text=data["text"],
                from_language=data["from_language"],
                to_language=data["to_language"],
            )

            return Response(
                {
                    "original_text": data["text"],
                    "translated_text": translated_text,
                    "from_language": data["from_language"],
                    "to_language": data["to_language"],
                },
                status=status.HTTP_200_OK,
            )

        except NkenneAIError:
            return Response(
                {
                    "error": (
                        "Translation failed. Please try again later."
                    )
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )
