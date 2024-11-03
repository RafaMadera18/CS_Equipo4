import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, tap } from "rxjs";

import { ObservableCollection } from "@utilities/rxjs";

import { Guid, Nullable } from "@customTypes/.";
import {
  RoomInfo,
  RoomCreateRequest,
  RoomAvailabilityState,
  RoomAvailability,
} from "@services/room-manager/data";

@Injectable({
  providedIn: "root",
})
export class RoomManagerService {
  // Null initially and until a get operation is performed
  private _roomsAvailabilityCache: Nullable<
    ObservableCollection<RoomAvailability>
  > = null;

  constructor(private readonly _httpClient: HttpClient) {}

  public getRoomsAvailability(): Observable<RoomAvailability[]> {
    if (this._roomsAvailabilityCache != null) {
      return this._roomsAvailabilityCache.items$;
    }

    const roomsAvailabilityFromApi = this._httpClient.get<RoomAvailability[]>(
      this.getFullPath("availability"),
    );

    this._roomsAvailabilityCache = new ObservableCollection();
    return this._roomsAvailabilityCache.loadItems(roomsAvailabilityFromApi);
  }

  public addRoom(roomCreateRequest: RoomCreateRequest): Observable<Guid> {
    return this._httpClient
      .post<Guid>(this.getFullPath(), roomCreateRequest)
      .pipe(
        tap((id: Guid) => {
          if (this._roomsAvailabilityCache == null) {
            return;
          }

          const room = RoomInfo.createFromRequest(id, roomCreateRequest);
          const roomStatus: RoomAvailability = {
            room: room,
            state: RoomAvailabilityState.Available, // TODO: Available by default?
          };

          this._roomsAvailabilityCache.add(roomStatus);
        }),
      );
  }

  public deleteRoom(room: RoomInfo): Observable<void> {
    return this._httpClient.delete<void>(this.getFullPath(room.id)).pipe(
      tap(() => {
        this._roomsAvailabilityCache?.removeFirstWhere(
          (availability) => availability.room.id == room.id,
        );
      }),
    );
  }

  private getFullPath(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
