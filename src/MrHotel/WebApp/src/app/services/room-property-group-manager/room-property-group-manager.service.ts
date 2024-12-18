import { Injectable } from "@angular/core";
import { Nullable } from "@customTypes/nullable";
import { ObservableCollection } from "@utilities/rxjs";
import { RoomPropertyGroup, RoomPropertyGroupCreationData } from "./data";
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
  ): Observable<Guid> {
    const newRoomPropertyGroupId =
      this._roomPropertyGroupGateway.addRoomPropertyGroup(
        roomPropertyGroupCreationData,
      );

    return newRoomPropertyGroupId.pipe(
      tap((newRoomPropertyGroupId: Guid) => {
        const newRoomPropertyGroup =
          roomPropertyGroupCreationData.toRoomPropertyGroup(
            newRoomPropertyGroupId,
          );

        this._roomPropertyGroupsCache?.add(newRoomPropertyGroup);
      }),
    );
  }

  public deleteRoomPropertyGroup(
    roomPropertyGroup: RoomPropertyGroup,
  ): Observable<void> {
    const deleteResponse =
      this._roomPropertyGroupGateway.deleteRoomPropertyGroup(
        roomPropertyGroup.id,
      );

    return deleteResponse.pipe(
      tap(() => {
        this._roomPropertyGroupsCache?.removeFirstWhere(
          (cacheRoomPropertyGroup) =>
            cacheRoomPropertyGroup.id === roomPropertyGroup.id,
        );
      }),
    );
  }

  public updateRoomPropertyGroup(
    roomPropertyGroup: RoomPropertyGroup,
  ): Observable<Record<string, string>> {
    const newRoomPropertyGroupIds =
      this._roomPropertyGroupGateway.updateRoomPropertyGroup(roomPropertyGroup);

    return newRoomPropertyGroupIds.pipe(
      tap((newRoomPropertyGroupIds: Record<string, Guid>) => {
        for (const property of roomPropertyGroup.properties) {
          const newId = newRoomPropertyGroupIds[property.name];
          property.id = newId;
        }

        const roomPropertyGroupIndexToUpdate: number =
          this._roomPropertyGroupsCache
            ?.getItems()
            .findIndex(
              (cachePropertyGroup) =>
                cachePropertyGroup.id === roomPropertyGroup.id,
            ) ?? -1;

        this._roomPropertyGroupsCache?.replaceAt(
          roomPropertyGroup,
          roomPropertyGroupIndexToUpdate,
        );
      }),
    );
  }
}
