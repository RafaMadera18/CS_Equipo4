import { Injectable } from "@angular/core";

import { Observable, tap } from "rxjs";

import { EventPublisher } from "@utilities/rxjs";

import { Guid } from "@customTypes/.";

import { RoomInfo, RoomCreationData } from "@services/room-manager/data";

import { RoomManagerGatewayService } from "./gateway/room-manager-gateway.service";

@Injectable({
  providedIn: "root",
})
export class RoomManagerService {
  private readonly _addRoomEvent = new EventPublisher<RoomInfo>();

  private readonly _deleteRoomEvent = new EventPublisher<Guid>();

  constructor(private readonly _roomGateway: RoomManagerGatewayService) {}

  public get addRoomEvent$(): Observable<RoomInfo> {
    return this._addRoomEvent.event$;
  }

  public get deleteRoomEvent$(): Observable<Guid> {
    return this._deleteRoomEvent.event$;
  }

  public addRoom(roomCreationData: RoomCreationData): Observable<Guid> {
    const addRequest = this._roomGateway.addRoom(roomCreationData);

    return addRequest.pipe(
      tap((id: Guid) => {
        const newRoom = roomCreationData.toRoomInfo(id);
        this._addRoomEvent.emit(newRoom);
      }),
    );
  }

  public deleteRoom(room: RoomInfo): Observable<void> {
    const deleteRequest = this._roomGateway.deleteRoom(room.id);

    return deleteRequest.pipe(
      tap(() => {
        this._deleteRoomEvent.emit(room.id);
      }),
    );
  }
}
