export interface SendEventParams {
  event: string;
  destination: string;
  payload: Record<string, any>;
}

export interface SendEventResponse {
  eventId: string;
  status: "queued" | "sent" | "retrying" | "failed";
}
