import { HttpClient } from "./util/http";
import { Events } from "./resources/events";
import { Deliveries } from "./resources/deliveries";
import { Destinations } from "./resources/destinations";

export class Relae {
  public events: Events;
  public deliveries: Deliveries;
  public destinations: Destinations;

  constructor(config: { apiKey: string; baseUrl?: string }) {
    const http = new HttpClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
    });
    this.events = new Events(http);
    this.deliveries = new Deliveries(http);
    this.destinations = new Destinations(http);
  }
}
