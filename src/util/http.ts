interface HttpClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export class HttpClient {
  private apiKey: string;
  private baseUrl: string;

  constructor({
    apiKey,
    baseUrl = "https://api.relaehook.com",
  }: HttpClientOptions) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  }

  async post<T>(
    path: string,
    body?: any,
    options?: { headers?: Record<string, string> },
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...(options?.headers ?? {}), // merge user-supplied headers
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return (await res.json()) as T;
  }
}
