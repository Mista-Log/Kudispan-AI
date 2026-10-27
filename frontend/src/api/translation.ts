import { apiFetch } from "./client";

export interface TranslationPayload {
  text: string;
  from_language: string;
  to_language: string;
}

export interface TranslationResponse {
  original_text: string;
  translated_text: string;
  from_language: string;
  to_language: string;
}

export async function translateText(
  payload: TranslationPayload
): Promise<TranslationResponse> {
  return apiFetch("/api/ai/translate/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
