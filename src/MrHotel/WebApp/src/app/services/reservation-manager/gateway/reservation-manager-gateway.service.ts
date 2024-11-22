import { Injectable } from "@angular/core";
import { ReservationCreationData } from "../data/reservation-creation-data";
import { Observable } from "rxjs";
import { Guid } from "@customTypes/index";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReservationManagerGatewayService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addReservation(
    reservationCreationData: ReservationCreationData,
  ): Observable<Guid> {
    const apiPath = this.getApiPath();
    return this._httpClient.post<Guid>(apiPath, reservationCreationData);
  }

  private getApiPath(path: string = ""): string {
    return `api/reservations/${path}`;
  }
}
