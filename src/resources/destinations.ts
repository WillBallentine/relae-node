import { HttpClient } from "../util/http";

export class Destinations {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get("/v1/destinations");
  }

  get(id: string) {
    return this.http.get(`/v1/destinations/${id}`);
  }
}
