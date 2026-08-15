import { apiFetch } from "./client";

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface ChatResponse {
  message: ChatMessage;
}

export async function sendChatMessage(
  message: string
): Promise<ChatResponse> {
  return apiFetch("/api/ai/chat/", {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
  });
}