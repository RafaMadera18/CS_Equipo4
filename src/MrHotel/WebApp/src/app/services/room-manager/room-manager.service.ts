import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, tap } from "rxjs";

import { ObservableCollection } from "@utilities/rxjs";

import { Guid, Nullable } from "@customTypes/.";
import { Room, RoomStatus, roomStatusEmpty } from "@services/room-manager/data";

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

  public addRoom(name: string): Observable<Guid> {
    const roomCreateRequest = { name: name };

    return this.http.post<Guid>(this.getFullPath(), roomCreateRequest).pipe(
      tap((id: Guid) => {
        this.roomStatusesCache?.add(roomStatusEmpty(id, name));
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
