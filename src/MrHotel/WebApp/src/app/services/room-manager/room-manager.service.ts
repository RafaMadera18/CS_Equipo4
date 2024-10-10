import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, tap } from "rxjs";

import { Guid, Nullable, SynchronizedCollection } from "@customTypes/.";
import { Room, RoomStatus, roomStatusEmpty } from "@services/room-manager/data";

@Injectable({
  providedIn: "root",
})
export class RoomManagerService {
  private roomStatuses: Nullable<SynchronizedCollection<RoomStatus>> = null;

  constructor(private readonly http: HttpClient) {}

  public getRoomStatuses(): Observable<RoomStatus[]> {
    if (this.roomStatuses != null) {
      return this.roomStatuses.items$;
    }

    this.roomStatuses = new SynchronizedCollection();
    return this.roomStatuses.load(
      this.http.get<RoomStatus[]>(this.getFullPath("statuses")),
    );
  }

  public addRoom(name: string): Observable<Guid> {
    return this.http.post<Guid>(this.getFullPath(), { name: name }).pipe(
      tap((id: Guid) => {
        this.roomStatuses?.add(roomStatusEmpty(id, name));
      }),
    );
  }

  public deleteRoom(room: Room) {
    return this.http.delete(this.getFullPath(room.id), {}).pipe(
      tap(() => {
        if (this.roomStatuses == null) {
          return;
        }

        const deleteIndex = this.roomStatuses
          ?.getItems()
          .findIndex((status) => status.room.id == room.id);

        this.roomStatuses.removeAt(deleteIndex);
      }),
    );
  }

  private getFullPath(path: string = ""): string {
    return `api/rooms/${path}`;
  }
}
