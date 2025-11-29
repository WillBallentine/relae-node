import { HttpClient } from "../util/http";

export class Deliveries {
  constructor(private http: HttpClient) {}

  get(deliveryId: string) {
    return this.http.get(`/v1/deliveries/${deliveryId}`);
  }

  //TODO: add to get all deliveries for an eventID

  retry(deliveryId: string) {
    return this.http.post(`/v1/deliveries/${deliveryId}/retry`);
  }
}
