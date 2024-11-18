import { Injectable } from "@angular/core";
import { Nullable } from "@customTypes/nullable";
import { ObservableCollection } from "@utilities/rxjs";
import { RoomPropertyGroup, RoomPropertyGroupCreationData } from "./data";
import { RoomAvailabilityManagerGatewayService } from "@services/room-availability-manager/gateway/room-availability-manager-gateway.service";
import { Observable, tap } from "rxjs";
import { RoomPropertyGroupManagerGatewayService } from "./gateway";
import { Guid } from "@customTypes/index";

@Injectable({
  providedIn: "root",
})
export class RoomPropertyGroupManagerService {
  private _roomPropertyGroupsCache: Nullable<
    ObservableCollection<RoomPropertyGroup>
  > = null;

  constructor(
    private readonly _roomPropertyGroupGateway: RoomPropertyGroupManagerGatewayService,
  ) {}

  public getRoomPropertyGroups(): Observable<readonly RoomPropertyGroup[]> {
    if (this._roomPropertyGroupsCache !== null) {
      return this._roomPropertyGroupsCache.items$;
    }

    const roomPropertyGroups =
      this._roomPropertyGroupGateway.getRoomPropertyGroups();

    this._roomPropertyGroupsCache = new ObservableCollection();
    return this._roomPropertyGroupsCache.loadItems(roomPropertyGroups);
  }

  public addRoomPropertyGroup(
    roomPropertyGroupCreationData: RoomPropertyGroupCreationData,
  ) {
    const addRequest = this._roomPropertyGroupGateway.addRoomPropertyGroup(
      roomPropertyGroupCreationData,
    );

    return addRequest.pipe(
      tap((newRoomPropertyGroupId: Guid) => {
        this._roomPropertyGroupsCache?.add(
          roomPropertyGroupCreationData.toRoomPropertyGroup(
            newRoomPropertyGroupId,
          ),
        );
      }),
    );
  }

  public deleteRoomPropertyGroup(
    roomPropertyGroup: RoomPropertyGroup,
  ): Observable<void> {
    const deleteRequest =
      this._roomPropertyGroupGateway.deleteRoomPropertyGroup(
        roomPropertyGroup.id,
      );

    return deleteRequest.pipe(
      tap(() => {
        this._roomPropertyGroupsCache?.removeFirstWhere(
          (cacheRoomPropertyGroup) =>
            cacheRoomPropertyGroup.id === roomPropertyGroup.id,
        );
      }),
    );
  }
}
