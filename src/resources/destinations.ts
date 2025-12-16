import { HttpClient } from "../http";
import {
  DestinationInput,
  DestinationListResponse,
} from "../types/destinations";

export class DestinationsResource {
  constructor(private client: HttpClient) {}

  list(): Promise<DestinationListResponse> {
    return this.client.request("GET", "/sdk/getdestinations");
  }

  create(input: DestinationInput) {
    return this.client.request("POST", "/sdk/adddestinations", input);
  }

  update(id: string, input: Partial<DestinationInput>) {
    return this.client.request("PUT", `/sdk/destinations/${id}`, input);
  }

  delete(id: string): Promise<void> {
    return this.client.request("DELETE", `/sdk/destinations/${id}`);
  }
}
