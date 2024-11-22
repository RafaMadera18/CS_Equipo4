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
  private readonly _updateRoomEvent = new EventPublisher<RoomInfo>();
  private readonly _deleteRoomEvent = new EventPublisher<Guid>();

  constructor(private readonly _roomGateway: RoomManagerGatewayService) {}

  public get addRoomEvent$(): Observable<RoomInfo> {
    return this._addRoomEvent.event$;
  }

  public get deleteRoomEvent$(): Observable<Guid> {
    return this._deleteRoomEvent.event$;
  }

  public get updateRoomEvent$(): Observable<RoomInfo> {
    return this._updateRoomEvent.event$;
  }

  public addRoom(roomCreationData: RoomCreationData): Observable<Guid> {
    const newRoomId = this._roomGateway.addRoom(roomCreationData);

    return newRoomId.pipe(
      tap((id: Guid) => {
        const newRoom = roomCreationData.toRoomInfo(id);
        this._addRoomEvent.emit(newRoom);
      }),
    );
  }

  public deleteRoom(room: RoomInfo): Observable<void> {
    const deleteResponse = this._roomGateway.deleteRoom(room.id);

    return deleteResponse.pipe(
      tap(() => {
        this._deleteRoomEvent.emit(room.id);
      }),
    );
  }

  public updateRoom(room: RoomInfo): Observable<void> {
    const updateResponse = this._roomGateway.editRoom(room);

    return updateResponse.pipe(
      tap(() => {
        this._updateRoomEvent.emit(room);
      }),
    );
  }
}
