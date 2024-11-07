import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { ObservableCollection } from "@utilities/rxjs";

import { Guid, Nullable } from "@customTypes/.";

import {
  RoomAvailability,
  RoomAvailabilityState,
  RoomInfo,
} from "@services/room-manager/data";

import { RoomManagerService } from "@services/room-manager";

import { RoomAvailabilityManagerGatewayService } from "./gateway/room-availability-manager-gateway.service";

@Injectable({
  providedIn: "root",
})
export class RoomAvailabilityManagerService {
  // Null initially and until a get operation is performed
  private _roomsAvailabilityCache: Nullable<
    ObservableCollection<RoomAvailability>
  > = null;

  constructor(
    private readonly _roomGateway: RoomAvailabilityManagerGatewayService,
    roomManager: RoomManagerService,
  ) {
    this.subscribeToRoomManagerEvents(roomManager);
  }

  public getRoomsAvailability(): Observable<readonly RoomAvailability[]> {
    if (this._roomsAvailabilityCache != null) {
      return this._roomsAvailabilityCache.items$;
    }

    const roomsAvailability = this._roomGateway.getRoomsAvailability();

    this._roomsAvailabilityCache = new ObservableCollection();
    return this._roomsAvailabilityCache.loadItems(roomsAvailability);
  }

  private subscribeToRoomManagerEvents(roomManager: RoomManagerService) {
    roomManager.addRoomEvent$.subscribe((room: RoomInfo) => {
      const availability: RoomAvailability = {
        room: room,
        state: RoomAvailabilityState.Available, // TODO: Available by default?
      };

      this._roomsAvailabilityCache?.add(availability);
    });

    roomManager.deleteRoomEvent$.subscribe((roomId: Guid) => {
      this._roomsAvailabilityCache?.removeFirstWhere(
        (availability) => availability.room.id == roomId,
      );
    });
  }
}