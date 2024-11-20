import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Guid } from "@customTypes/guid";
import { RoomCreationData, RoomInfo } from "../data";
import { RoomUpdateData } from "../data/room-update-data";

@Injectable({
  providedIn: "root",
})
export class RoomManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addRoom(roomCreationData: RoomCreationData): Observable<Guid> {
    const apiUrl: string = this.getApiUrl();

    return this._httpClient.post<Guid>(apiUrl, roomCreationData);
  }

  public deleteRoom(roomId: Guid): Observable<void> {
    const apiUrl: string = this.getApiUrl(roomId);

    return this._httpClient.delete<void>(apiUrl);
  }

  public editRoom(room: RoomInfo): Observable<void> {
    const apiUrl: string = this.getApiUrl(room.id);

    const roomUpdateData = new RoomUpdateData(
      room.name,
      room.properties
        .map(property => property.id)
        .filter((id): id is Guid => id !== null)
    );

    console.log(roomUpdateData)
    return this._httpClient.put<void>(apiUrl, roomUpdateData);
  }

  private getApiUrl(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
