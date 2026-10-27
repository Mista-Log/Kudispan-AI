const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("access");

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL.replace(/\/$/, "")}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    let msg = data.error || data.detail || data.message;
    if (!msg && typeof data === "object" && data !== null) {
      const firstKey = Object.keys(data)[0];
      if (firstKey && Array.isArray(data[firstKey])) {
        msg = `${firstKey}: ${data[firstKey][0]}`;
      } else if (firstKey && typeof data[firstKey] === "string") {
        msg = `${firstKey}: ${data[firstKey]}`;
      }
    }
    throw new Error(msg || "Something went wrong");
  }

  return data;
}