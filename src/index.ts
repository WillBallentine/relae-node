import { HttpClient } from "./http";
import { DestinationsResource } from "./resources/destinations";
import { WebhooksResource } from "./resources/webhooks";
import { DeadLetterResource } from "./resources/deadletter";
import { Utils } from "./utils";

export * from "./types";

export class Relae {
  public destinations: DestinationsResource;
  public webhooks: WebhooksResource;
  public deadLetter: DeadLetterResource;
  public utils: Utils;

  constructor(apiKey: string) {
    const client = new HttpClient(apiKey);
    this.destinations = new DestinationsResource(client);
    this.webhooks = new WebhooksResource(client);
    this.deadLetter = new DeadLetterResource(client);
    this.utils = new Utils();
  }
}
