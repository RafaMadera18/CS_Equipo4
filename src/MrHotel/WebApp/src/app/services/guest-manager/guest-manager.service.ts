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
  private guestsCache: Nullable<ObservableCollection<GuestInfo>> = null;

  constructor(private readonly http: HttpClient) {}

  public getGuests(): Observable<GuestInfo[]> {
    if (this.guestsCache != null) {
      return this.guestsCache.items$;
    }

    const guestsFromApi: Observable<GuestInfo[]> = this.http
      .get<GuestInfoDto[]>(this.getFullPath())
      .pipe(mapCollection(GuestInfo.createFromDto));

    this.guestsCache = new ObservableCollection();
    return this.guestsCache.loadItems(guestsFromApi);
  }

  public addGuest(guestCreateRequest: GuestCreateRequest): Observable<Guid> {
    return this.http.post<Guid>(this.getFullPath(), guestCreateRequest).pipe(
      tap((id: Guid) => {
        this.guestsCache?.add(guestCreateRequest.replicate(id));
      }),
    );
  }

  public deleteGuest(guest: GuestInfo): Observable<void> {
    return this.http.delete<void>(this.getFullPath(guest.id)).pipe(
      tap(() => {
        this.guestsCache?.removeFirstWhere(
          (cacheGuest) => cacheGuest.id == guest.id,
        );
      }),
    );
  }

  private getFullPath(path: string = ""): string {
    return `api/guests/${path}`;
  }
}
