import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { mapCollection } from "@utilities/rxjs";

import { Guid } from "@customTypes/guid";

import { GuestCreationData, GuestInfo, GuestInfoDto } from "../data";

@Injectable({
  providedIn: "root",
})
export class GuestManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public getGuests(): Observable<GuestInfo[]> {
    const apiPath: string = this.getApiPath();

    const guests = this._httpClient
      .get<GuestInfoDto[]>(apiPath)
      .pipe(mapCollection(GuestInfo.createFromDto));

    return guests;
  }

  public addGuest(guestCreationData: GuestCreationData): Observable<Guid> {
    const apiPath: string = this.getApiPath();

    const newGuestId = this._httpClient.post<Guid>(apiPath, guestCreationData);

    return newGuestId;
  }

  public deleteGuest(guestId: Guid): Observable<void> {
    const apiPath: string = this.getApiPath(guestId);

    return this._httpClient.delete<void>(apiPath);
  }

  public updateGuest(guest: GuestInfoDto): Observable<void> {
    const apiPath: string = this.getApiPath(guest.id);

    return this._httpClient.put<void>(apiPath, guest);
  }

  private getApiPath(path: string = ""): string {
    return `api/guests/${path}`;
  }
}
