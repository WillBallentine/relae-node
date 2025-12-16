export interface WebhookEvent {
  id: string;
  account_id: string;
  source: string;
  payload: Record<string, any>;
  headers: Record<string, any>;
  status: string;
  retry_count: number;
  created_at: string;
  updated_at: string;
  duration: number;
}

export interface DeadLetterEvent {
  id: string;
  orig_id: string;
  account_id: string;
  source: string;
  payload: Record<string, any>;
  headers: Record<string, any>;
  retry_count: number;
  failed_reason: string;
  created_at: string;
}

export interface PaginatedWebhookEvents {
  events: WebhookEvent[];
  next_cursor?: string;
}

export interface PaginatedDeadLetterEvents {
  events: DeadLetterEvent[];
  next_cursor?: string;
}
