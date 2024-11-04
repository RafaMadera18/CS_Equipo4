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

import { RoomManagerGatewayService } from "./gateway/room-manager-gateway.service";

@Injectable({
  providedIn: "root",
})
export class RoomManagerService {
  // Null initially and until a get operation is performed
  private _roomsAvailabilityCache: Nullable<
    ObservableCollection<RoomAvailability>
  > = null;

  constructor(private readonly _roomGateway: RoomManagerGatewayService) {}

  public getRoomsAvailability(): Observable<RoomAvailability[]> {
    if (this._roomsAvailabilityCache != null) {
      return this._roomsAvailabilityCache.items$;
    }

    const roomsAvailability = this._roomGateway.getRoomsAvailability();

    this._roomsAvailabilityCache = new ObservableCollection();
    return this._roomsAvailabilityCache.loadItems(roomsAvailability);
  }

  public addRoom(roomCreateRequest: RoomCreateRequest): Observable<Guid> {
    const addRequest = this._roomGateway.addRoom(roomCreateRequest);

    return addRequest.pipe(
      tap((id: Guid) => {
        this._roomsAvailabilityCache?.add(
          roomCreateRequest.toRoomAvailability(id),
        );
      }),
    );
  }

  public deleteRoom(room: RoomInfo): Observable<void> {
    const deleteRequest = this._roomGateway.deleteRoom(room.id);

    return deleteRequest.pipe(
      tap(() => {
        this._roomsAvailabilityCache?.removeFirstWhere(
          (availability) => availability.room.id == room.id,
        );
      }),
    );
  }
}
