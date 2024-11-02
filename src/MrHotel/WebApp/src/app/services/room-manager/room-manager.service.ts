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
  private roomsAvailabilityCache: Nullable<
    ObservableCollection<RoomAvailability>
  > = null;

  constructor(private readonly http: HttpClient) {}

  public getRoomsAvailability(): Observable<RoomAvailability[]> {
    if (this.roomsAvailabilityCache != null) {
      return this.roomsAvailabilityCache.items$;
    }

    const roomsAvailabilityFromApi = this.http.get<RoomAvailability[]>(
      this.getFullPath("availability"),
    );

    this.roomsAvailabilityCache = new ObservableCollection();
    return this.roomsAvailabilityCache.loadItems(roomsAvailabilityFromApi);
  }

  public addRoom(roomCreateRequest: RoomCreateRequest): Observable<Guid> {
    return this.http.post<Guid>(this.getFullPath(), roomCreateRequest).pipe(
      tap((id: Guid) => {
        if (this.roomsAvailabilityCache == null) {
          return;
        }

        const room = roomCreateRequest.createRoomInfo(id);
        const roomStatus: RoomAvailability = {
          room: room,
          state: RoomAvailabilityState.Available, // TODO: Available by default?
        };

        this.roomsAvailabilityCache.add(roomStatus);
      }),
    );
  }

  public deleteRoom(room: RoomInfo): Observable<void> {
    return this.http.delete<void>(this.getFullPath(room.id)).pipe(
      tap(() => {
        this.roomsAvailabilityCache?.removeFirstWhere(
          (availability) => availability.room.id == room.id,
        );
      }),
    );
  }

  private getFullPath(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
