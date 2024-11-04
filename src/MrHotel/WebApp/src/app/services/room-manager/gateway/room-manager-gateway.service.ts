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
    const apiUrl: string = this.getApiPath("availability");

    return this._httpClient.get<RoomAvailability[]>(apiUrl);
  }

  public addRoom(roomCreateRequest: RoomCreateRequest): Observable<Guid> {
    const apiUrl: string = this.getApiPath();

    return this._httpClient.post<Guid>(apiUrl, roomCreateRequest);
  }

  public deleteRoom(roomId: Guid): Observable<void> {
    const apiUrl: string = this.getApiPath(roomId);

    return this._httpClient.delete<void>(apiUrl);
  }

  private getApiPath(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
