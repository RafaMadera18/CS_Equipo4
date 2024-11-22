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
    const apiPath: string = this.getApiPath();

    return this._httpClient.get<RoomPropertyGroup[]>(apiPath);
  }

  public addRoomPropertyGroup(
    roomPropertyGroupCreationData: RoomPropertyGroupCreationData,
  ): Observable<Guid> {
    const apiPath: string = this.getApiPath();

    return this._httpClient.post<Guid>(apiPath, roomPropertyGroupCreationData);
  }

  public deleteRoomPropertyGroup(roomPropertyGroupId: Guid): Observable<void> {
    const apiPath: string = this.getApiPath(roomPropertyGroupId);

    return this._httpClient.delete<void>(apiPath);
  }

  public updateRoomPropertyGroup(
    roomPropertyGroup: RoomPropertyGroup,
  ): Observable<Record<string, Guid>> {
    const apiPath: string = this.getApiPath(roomPropertyGroup.id);

    return this._httpClient.put<Record<string, Guid>>(
      apiPath,
      roomPropertyGroup,
    );
  }

  private getApiPath(path: string = ""): string {
    return `api/room-property-groups/${path}`;
  }
}
