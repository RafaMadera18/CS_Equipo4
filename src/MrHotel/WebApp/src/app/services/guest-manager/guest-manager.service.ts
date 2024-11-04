import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, tap } from "rxjs";

import { mapCollection, ObservableCollection } from "@utilities/rxjs";

import { Nullable, Guid } from "@customTypes/.";
import { GuestInfo, GuestInfoDto, GuestCreateRequest } from "./data";

@Injectable({
  providedIn: "root",
})
export class GuestManagerService {
  // Null initially and until a get operation is performed
  private _guestsCache: Nullable<ObservableCollection<GuestInfo>> = null;

  constructor(private readonly _httpClient: HttpClient) {}

  public getGuests(): Observable<GuestInfo[]> {
    if (this._guestsCache != null) {
      return this._guestsCache.items$;
    }

    const guestsFromApi: Observable<GuestInfo[]> = this._httpClient
      .get<GuestInfoDto[]>(this.getFullPath())
      .pipe(mapCollection(GuestInfo.createFromDto));

    this._guestsCache = new ObservableCollection();
    return this._guestsCache.loadItems(guestsFromApi);
  }

  public addGuest(guestCreateRequest: GuestCreateRequest): Observable<Guid> {
    const guestCreationObservable = this.sendGuestCreationRequest(
      guestCreateRequest,
    ).pipe(
      tap((newGuestId: Guid) => {
        this._guestsCache?.add(guestCreateRequest.toGuestInfo(newGuestId));
      }),
    );

    return guestCreationObservable;
  }

  private sendGuestCreationRequest(
    guestCreateRequest: GuestCreateRequest,
  ): Observable<Guid> {
    const apiUrl = this.getFullPath();
    const requestToServer = this._httpClient.post<Guid>(
      apiUrl,
      guestCreateRequest,
    );

    return requestToServer;
  }

  public deleteGuest(guest: GuestInfo): Observable<void> {
    return this._httpClient.delete<void>(this.getFullPath(guest.id)).pipe(
      tap(() => {
        this._guestsCache?.removeFirstWhere(
          (cacheGuest) => cacheGuest.id == guest.id,
        );
      }),
    );
  }

  private getFullPath(path: string = ""): string {
    return `api/guests/${path}`;
  }
}
