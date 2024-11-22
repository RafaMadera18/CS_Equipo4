import { Injectable } from "@angular/core";
import { Guid, Nullable } from "@customTypes/index";
import { ObservableCollection } from "@utilities/rxjs";
import { ReservationCreationData, ReservationInfo } from "./data";
import { ReservationManagerGatewayService } from "./gateway";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReservationManagerService {
  private readonly _reservationsCache: Nullable<
    ObservableCollection<ReservationInfo>
  > = null;

  constructor(
    private readonly _reservationGateway: ReservationManagerGatewayService,
  ) {}

  public addReservation(
    reservationCreationData: ReservationCreationData,
  ): Observable<Guid> {
    const addRequest = this._reservationGateway.addReservation(
      reservationCreationData,
    );

    return addRequest.pipe(
      tap((newReservationId: Guid) => {
        this._reservationsCache?.add(
          reservationCreationData.toReservationInfo(newReservationId),
        );
      }),
    );
  }
}
