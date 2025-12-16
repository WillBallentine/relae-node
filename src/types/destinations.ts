export interface DestinationHeader {
  key: string;
  value: string;
}

export interface Destination {
  id: string;
  account_id: string;
  source: string;
  destination_url: string;
  headers: DestinationHeader[];
  vendor_webhook_secret?: string;
  endpoint_token: string;
  webhook_url: string;
  is_active: boolean;
  last_used_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DestinationInput {
  source: string;
  destination_url: string;
  headers?: Record<string, string>[];
  vendor_webhook_secret?: string;
}

export interface DestinationListResponse {
  destinations: Destination[];
}
