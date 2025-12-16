import { HttpClient } from "../http";
import { PaginatedWebhookEvents, WebhookEvent } from "../types/events";

export class WebhooksResource {
  constructor(private client: HttpClient) {}

  list(cursor?: string): Promise<PaginatedWebhookEvents> {
    const qs = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
    return this.client.request("GET", `/sdk/webhooks/getall${qs}`);
  }

  async *all(): AsyncGenerator<WebhookEvent, void, unknown> {
    let cursor: string | undefined = undefined;
    while (true) {
      const page = await this.list(cursor);
      for (const event of page.events) yield event;
      if (!page.next_cursor) break;
      cursor = page.next_cursor;
    }
  }

  /** Fetch all pages and return as arrays of events */
  async listAllPages(): Promise<WebhookEvent[][]> {
    const pages: WebhookEvent[][] = [];
    let cursor: string | undefined = undefined;

    while (true) {
      const page = await this.list(cursor);
      pages.push(page.events);
      if (!page.next_cursor) break;
      cursor = page.next_cursor;
    }

    return pages;
  }
}
