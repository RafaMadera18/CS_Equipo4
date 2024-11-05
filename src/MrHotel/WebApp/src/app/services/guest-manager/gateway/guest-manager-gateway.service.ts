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
    const apiUrl: string = this.getApiPath();

    return this._httpClient
      .get<GuestInfoDto[]>(apiUrl)
      .pipe(mapCollection(GuestInfo.createFromDto));
  }

  public addGuest(guestCreationData: GuestCreationData): Observable<Guid> {
    const apiUrl: string = this.getApiPath();

    return this._httpClient.post<Guid>(apiUrl, guestCreationData);
  }

  public deleteGuest(guestId: Guid): Observable<void> {
    const apiUrl: string = this.getApiPath(guestId);

    return this._httpClient.delete<void>(apiUrl);
  }

  private getApiPath(path: string = ""): string {
    return `api/guests/${path}`;
  }
}
