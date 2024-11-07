import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RoomAvailability } from "@services/room-manager/data";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RoomAvailabilityManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getRoomsAvailability(): Observable<RoomAvailability[]> {
    const apiUrl: string = this.getApiPath();

    return this._httpClient.get<RoomAvailability[]>(apiUrl);
  }

  private getApiPath(): string {
    return "api/rooms/availability";
  }
}
