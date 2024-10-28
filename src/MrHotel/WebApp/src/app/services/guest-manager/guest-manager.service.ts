import { Injectable } from "@angular/core";
import { Nullable } from "@customTypes/nullable";
import { createGuest, Guest } from "./data";
import { Guid, ObservableCollection } from "@customTypes/index";
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GuestManagerService {
  private guests: Nullable<ObservableCollection<Guest>> = null;

  constructor(private readonly http: HttpClient) {}

  public getGuests(): Observable<Guest[]> {
    if (this.guests != null) {
      return this.guests.items$;
    }

    this.guests = new ObservableCollection();
    return this.guests.load(this.http.get<Guest[]>(this.getFullPath("guests")));
    // TODO: Change endpoint
  }

  public addGuest(
    name: string,
    phoneNumber: string,
    dateOfBirth: Date,
  ): Observable<Guid> {
    return this.http
      .post<Guid>(this.getFullPath(), {
        name: name,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
      })
      .pipe(
        tap((id: Guid) => {
          this.guests?.add(createGuest(id, name, phoneNumber, dateOfBirth));
        }),
      );
  }

  public deleteGuest(guest: Guest): Observable<void> {
    return this.http.delete(this.getFullPath(guest.id), {}).pipe(
      tap(() => {
        if (this.guests == null) {
          return;
        }

        const deleteIndex = this.guests
          .getItems()
          .findIndex((guestIterator) => guestIterator.id == guest.id);

        this.guests.removeAt(deleteIndex);
      }),
      map(() => undefined),
    );
  }

  private getFullPath(path: string = ""): string {
    return `api/guests/${path}`;
  }
}
