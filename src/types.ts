//TODO: review these structs
export interface SendEventParams {
  event: string;
  destination: string;
  payload: Record<string, any>;
  headers: Record<string, any>;
}

export interface SendEventResponse {
  eventId: string;
  deliveryId: string;
  status: "queued" | "sent" | "retrying" | "failed";
}

export interface DestinationParams {
  url: string;
  name: string;
  type: "customer" | "vendor";
  headers?: Record<string, any>;
  customerSecret?: string;
}

export interface DestinationCreateResponse {
  destinationId: string;
}
