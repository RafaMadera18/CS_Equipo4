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
    const apiPath: string = this.getApiPath();

    return this._httpClient.post<Guid>(apiPath, roomCreationData);
  }

  public deleteRoom(roomId: Guid): Observable<void> {
    const apiPath: string = this.getApiPath(roomId);

    return this._httpClient.delete<void>(apiPath);
  }

  public editRoom(room: RoomInfo): Observable<void> {
    const apiPath: string = this.getApiPath(room.id);

    const roomUpdateData = new RoomUpdateData(
      room.name,
      room.properties
        .map((property) => property.id)
        .filter((id): id is Guid => id !== null),
    );
    return this._httpClient.put<void>(apiPath, roomUpdateData);
  }

  private getApiPath(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
