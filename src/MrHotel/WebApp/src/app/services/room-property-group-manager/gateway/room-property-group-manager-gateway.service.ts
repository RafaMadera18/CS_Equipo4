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

  public deleteRoomPropertyGroup(roomPropertyGroupId: Guid): Observable<void> {
    const apiUrl: string = this.getApiUrl(roomPropertyGroupId);

    return this._httpClient.delete<void>(apiUrl);
  }

  public updateRoomPropertyGroup(
    roomPropertyGroup: RoomPropertyGroup,
  ): Observable<Record<string, Guid>> {
    const apiUrl: string = this.getApiUrl(roomPropertyGroup.id);

    return this._httpClient.put<Record<string, Guid>>(
      apiUrl,
      roomPropertyGroup,
    );
  }

  private getApiUrl(path: string = ""): string {
    return `api/room-property-groups/${path}`;
  }
}
