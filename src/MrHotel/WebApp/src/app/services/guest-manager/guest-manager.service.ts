import { Injectable } from "@angular/core";

import { Observable, tap } from "rxjs";

import { ObservableCollection } from "@utilities/rxjs";

import { Nullable, Guid } from "@customTypes/.";

import { GuestInfo, GuestCreationData } from "./data";

import { GuestManagerGatewayService } from "./gateway/guest-manager-gateway.service";

@Injectable({
  providedIn: "root",
})
export class GuestManagerService {
  // Null initially and until a get operation is performed
  private _guestsCache: Nullable<ObservableCollection<GuestInfo>> = null;

  constructor(private readonly _guestGateway: GuestManagerGatewayService) {}

  public getGuests(): Observable<readonly GuestInfo[]> {
    if (this._guestsCache !== null) {
      return this._guestsCache.items$;
    }

    const guests = this._guestGateway.getGuests();

    this._guestsCache = new ObservableCollection();
    return this._guestsCache.loadItems(guests);
  }

  public addGuest(guestCreationData: GuestCreationData): Observable<Guid> {
    const newGuestId = this._guestGateway.addGuest(guestCreationData);

    return newGuestId.pipe(
      tap((newGuestId: Guid) => {
        this._guestsCache?.add(guestCreationData.toGuestInfo(newGuestId));
      }),
    );
  }

  public deleteGuest(guest: GuestInfo): Observable<void> {
    const deleteResponse = this._guestGateway.deleteGuest(guest.id);

    return deleteResponse.pipe(
      tap(() => {
        this._guestsCache?.removeFirstWhere(
          (cacheGuest) => cacheGuest.id === guest.id,
        );
      }),
    );
  }

  public editGuest(guest: GuestInfo): Observable<void> {
    const updateResponse = this._guestGateway.editGuest(guest.toGuestInfoDTO());

    return updateResponse.pipe(
      tap(() => {
        const guestIndexToUpdate: number =
          this._guestsCache
            ?.getItems()
            .findIndex((cacheGuest) => cacheGuest.id === guest.id) ?? -1;

        this._guestsCache?.replaceAt(guest, guestIndexToUpdate);
      }),
    );
  }
}
