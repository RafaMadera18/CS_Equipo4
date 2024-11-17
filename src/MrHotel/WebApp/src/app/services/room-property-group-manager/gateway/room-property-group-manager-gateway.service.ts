import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Guid } from "@customTypes/guid";
import { Observable } from "rxjs";
import { RoomPropertyGroup, RoomPropertyGroupCreationData } from "../data";

@Injectable({
  providedIn: "root",
})
export class RoomPropertyGroupManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getRoomPropertyGroups(): Observable<RoomPropertyGroup[]> {
    const apiUrl: string = this.getApiUrl();

    return this._httpClient.get<RoomPropertyGroup[]>(apiUrl);
  }

  public addRoomPropertyGroup(
    roomPropertyGroupCreationData: RoomPropertyGroupCreationData,
  ): Observable<Guid> {
    const apiUrl: string = this.getApiUrl();

    return this._httpClient.post<Guid>(apiUrl, roomPropertyGroupCreationData);
  }

  private getApiUrl(path: string = ""): string {
    return `api/room-property-groups/${path}`;
  }
}