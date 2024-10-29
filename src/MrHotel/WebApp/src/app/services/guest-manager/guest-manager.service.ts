import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, tap } from "rxjs";

import { mapCollection, ObservableCollection } from "@utilities/rxjs";

import { Nullable, Guid } from "@customTypes/.";
import { Guest, GuestCreateRequest, GuestDto } from "./data";

@Injectable({
  providedIn: "root",
})
export class GuestManagerService {
  // Null initially and until a get operation is performed
  private guestsCache: Nullable<ObservableCollection<Guest>> = null;

  constructor(private readonly http: HttpClient) {}

  public getGuests(): Observable<Guest[]> {
    if (this.guestsCache != null) {
      return this.guestsCache.items$;
    }

    const guests: Observable<Guest[]> = this.http
      .get<GuestDto[]>(this.getFullPath())
      .pipe(mapCollection(Guest.fromDto));

    this.guestsCache = new ObservableCollection();
    return this.guestsCache.load(guests);
  }

  public addGuest(guestCreateRequest: GuestCreateRequest): Observable<Guid> {
    return this.http.post<Guid>(this.getFullPath(), guestCreateRequest).pipe(
      tap((id: Guid) => {
        this.guestsCache?.add(guestCreateRequest.replicate(id));
      }),
    );
  }

  public deleteGuest(guest: Guest): Observable<void> {
    return this.http.delete<void>(this.getFullPath(guest.id), {}).pipe(
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
