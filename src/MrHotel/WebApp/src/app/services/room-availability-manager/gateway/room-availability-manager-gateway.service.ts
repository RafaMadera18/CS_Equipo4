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
    const apiPath: string = this.getApiPath();

    const roomsAvailability = this._httpClient.get<RoomAvailability[]>(apiPath);

    return roomsAvailability;
  }

  private getApiPath(): string {
    return "api/rooms/availability";
  }
}
