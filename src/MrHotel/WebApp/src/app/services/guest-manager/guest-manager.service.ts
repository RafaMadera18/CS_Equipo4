import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, tap } from "rxjs";

import { mapCollection, ObservableCollection } from "@utilities/rxjs";

import { Nullable, Guid } from "@customTypes/.";
import { GuestInfo, GuestInfoDto, GuestCreateRequest } from "./data";
import { GuestManagerGatewayService } from "./gateway/guest-manager-gateway.service";

@Injectable({
  providedIn: "root",
})
export class GuestManagerService {
  // Null initially and until a get operation is performed
  private _guestsCache: Nullable<ObservableCollection<GuestInfo>> = null;

  constructor(private readonly _guestGateway: GuestManagerGatewayService) {}

  public getGuests(): Observable<GuestInfo[]> {
    if (this._guestsCache != null) {
      return this._guestsCache.items$;
    }

    const guests = this._guestGateway.getGuests();

    this._guestsCache = new ObservableCollection();
    return this._guestsCache.loadItems(guests);
  }

  public addGuest(guestCreateRequest: GuestCreateRequest): Observable<Guid> {
    const addRequest = this._guestGateway.addGuest(guestCreateRequest);

    return addRequest.pipe(
      tap((newGuestId: Guid) => {
        this._guestsCache?.add(guestCreateRequest.toGuestInfo(newGuestId));
      }),
    );
  }

  public deleteGuest(guest: GuestInfo): Observable<void> {
    const deleteRequest = this._guestGateway.deleteGuest(guest.id);

    return deleteRequest.pipe(
      tap(() => {
        this._guestsCache?.removeFirstWhere(
          (cacheGuest) => cacheGuest.id == guest.id,
        );
      }),
    );
  }
}
