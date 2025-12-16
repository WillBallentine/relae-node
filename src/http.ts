import crypto from "crypto";
import {
  RelaeError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  InternalServerError,
} from "./errors";

const BASE_URL = "https://api.relaehook.com";

export class HttpClient {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("Relae API key is required");
    this.apiKey = apiKey;
  }

  async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const requestId = crypto.randomUUID();

    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "X-Request-Id": requestId,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      let errorMessage = res.statusText;
      let raw: any = undefined;

      try {
        raw = await res.json();
        errorMessage = raw.error ?? errorMessage;
      } catch {}

      switch (res.status) {
        case 401:
          throw new UnauthorizedError(errorMessage, raw);
        case 403:
          throw new ForbiddenError(errorMessage, raw);
        case 404:
          throw new NotFoundError(errorMessage, raw);
        case 429:
          throw new RateLimitError(errorMessage, raw);
        case 500:
          throw new InternalServerError(errorMessage, raw);
        default:
          throw new RelaeError(errorMessage, res.status, raw);
      }
    }

    const text = await res.text();
    if (!text) {
      return undefined as unknown as T;
    }
    return JSON.parse(text) as T;
  }
}
