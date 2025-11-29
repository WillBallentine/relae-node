import { HttpClient } from "../util/http";
import { SendEventParams, SendEventResponse } from "../types";

export class Events {
  constructor(private http: HttpClient) {}

  send(params: SendEventParams): Promise<SendEventResponse> {
    const idempotencyKey = crypto.randomUUID();

    return this.http.post("/v1/events", params, {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    });
  }

  get(eventId: string): Promise<SendEventResponse> {
    return this.http.get<SendEventResponse>(`/v1/events/${eventId}`);
  }
}
