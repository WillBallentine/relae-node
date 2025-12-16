import { HttpClient } from "../http";
import {
  PaginatedDeadLetterEvents,
  DeadLetterEvent,
  MultiRetryRequest,
} from "../types/events";

export class DeadLetterResource {
  constructor(private client: HttpClient) {}

  list(cursor?: string): Promise<PaginatedDeadLetterEvents> {
    const qs = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
    return this.client.request("GET", `/sdk/deadletter/getall${qs}`);
  }

  replay(eventId: string): Promise<void> {
    return this.client.request("POST", `/sdk/webhooks/replay/${eventId}`);
  }

  replayMulti(input: MultiRetryRequest): Promise<void> {
    return this.client.request("POST", `/sdk/webhooks/replaymulti/`, input);
  }

  async *all(): AsyncGenerator<DeadLetterEvent, void, unknown> {
    let cursor: string | undefined = undefined;
    while (true) {
      const page = await this.list(cursor);
      for (const event of page.events) yield event;
      if (!page.next_cursor) break;
      cursor = page.next_cursor;
    }
  }

  /** Fetch all pages and return as arrays of events */
  async listAllPages(): Promise<DeadLetterEvent[][]> {
    const pages: DeadLetterEvent[][] = [];
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
