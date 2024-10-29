import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, tap } from "rxjs";

import { ObservableCollection } from "@utilities/rxjs";

import { Guid, Nullable } from "@customTypes/.";
import {
  Room,
  RoomCreateRequest,
  RoomState,
  RoomStatus,
} from "@services/room-manager/data";

@Injectable({
  providedIn: "root",
})
export class RoomManagerService {
  // Null initially and until a get operation is performed
  private roomStatusesCache: Nullable<ObservableCollection<RoomStatus>> = null;

  constructor(private readonly http: HttpClient) {}

  public getRoomStatuses(): Observable<RoomStatus[]> {
    if (this.roomStatusesCache != null) {
      return this.roomStatusesCache.items$;
    }

    this.roomStatusesCache = new ObservableCollection();
    return this.roomStatusesCache.load(
      this.http.get<RoomStatus[]>(this.getFullPath("statuses")),
    );
  }

  public addRoom(roomCreateRequest: RoomCreateRequest): Observable<Guid> {
    return this.http.post<Guid>(this.getFullPath(), roomCreateRequest).pipe(
      tap((id: Guid) => {
        if (this.roomStatusesCache == null) {
          return;
        }

        const room = roomCreateRequest.replicate(id);
        const roomStatus: RoomStatus = {
          room: room,
          state: RoomState.Available, // TODO: Available by default?
        };

        this.roomStatusesCache.add(roomStatus);
      }),
    );
  }

  public deleteRoom(room: Room): Observable<void> {
    return this.http.delete<void>(this.getFullPath(room.id), {}).pipe(
      tap(() => {
        this.roomStatusesCache?.removeFirstWhere(
          (status) => status.room.id == room.id,
        );
      }),
    );
  }

  private getFullPath(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
