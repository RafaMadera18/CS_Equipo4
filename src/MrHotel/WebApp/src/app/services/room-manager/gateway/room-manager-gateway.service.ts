import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Guid } from "@customTypes/guid";

import { RoomAvailability, RoomCreationData } from "../data";

@Injectable({
  providedIn: "root",
})
export class RoomManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addRoom(roomCreationData: RoomCreationData): Observable<Guid> {
    const apiUrl: string = this.getApiPath();

    return this._httpClient.post<Guid>(apiUrl, roomCreationData);
  }

  public deleteRoom(roomId: Guid): Observable<void> {
    const apiUrl: string = this.getApiPath(roomId);

    return this._httpClient.delete<void>(apiUrl);
  }

  private getApiPath(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
