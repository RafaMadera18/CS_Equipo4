import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Guid } from "@customTypes/guid";

import { RoomAvailability, RoomCreateRequest } from "../data";

@Injectable({
  providedIn: "root",
})
export class RoomManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getRoomsAvailability(): Observable<RoomAvailability[]> {
    const apiUrl: string = this.getFullPath("availability");

    return this._httpClient.get<RoomAvailability[]>(apiUrl);
  }

  public addRoom(roomCreateRequest: RoomCreateRequest): Observable<Guid> {
    const apiUrl: string = this.getFullPath();

    return this._httpClient.post<Guid>(apiUrl, roomCreateRequest);
  }

  public deleteRoom(roomId: Guid): Observable<void> {
    const apiUrl: string = this.getFullPath(roomId);

    return this._httpClient.delete<void>(apiUrl);
  }

  private getFullPath(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
