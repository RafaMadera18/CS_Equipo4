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

    const newReservationId = this._httpClient.post<Guid>(
      apiPath,
      reservationCreationData,
    );

    return newReservationId;
  }

  public makeCheckOut(reservationId: Guid): Observable<void> {
    const apiPath = this.getApiPath(reservationId + "/checkout");
    return this._httpClient.put<void>(apiPath, {});
  }

  private getApiPath(path: string = ""): string {
    return `api/reservations/${path}`;
  }
}
