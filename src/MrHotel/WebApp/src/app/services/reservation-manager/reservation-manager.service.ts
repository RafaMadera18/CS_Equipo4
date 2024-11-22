import { Injectable } from "@angular/core";
import { Guid, Nullable } from "@customTypes/index";
import { EventPublisher, ObservableCollection } from "@utilities/rxjs";
import { ReservationCreationData, ReservationInfo } from "./data";
import { ReservationManagerGatewayService } from "./gateway";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReservationManagerService {
  private readonly _addReservationEvent = new EventPublisher<ReservationInfo>();

  private readonly _makeCheckOutEvent = new EventPublisher<ReservationInfo>();

  public get addReservationEvent$() {
    return this._addReservationEvent.event$;
  }

  public get makeCheckOutEvent$() {
    return this._makeCheckOutEvent.event$;
  }

  private readonly _reservationsCache: Nullable<
    ObservableCollection<ReservationInfo>
  > = null;

  constructor(
    private readonly _reservationGateway: ReservationManagerGatewayService,
  ) {}

  public addReservation(
    reservationCreationData: ReservationCreationData,
  ): Observable<Guid> {
    const newReservationId = this._reservationGateway.addReservation(
      reservationCreationData,
    );

    return newReservationId.pipe(
      tap((newReservationId: Guid) => {
        const reservation =
          reservationCreationData.toReservationInfo(newReservationId);
        this._reservationsCache?.add(reservation);
        this._addReservationEvent.emit(reservation);
      }),
    );
  }

  public makeCheckout(reservation: ReservationInfo): Observable<void> {
    const checkOutRequest = this._reservationGateway.makeCheckOut(
      reservation.id,
    );

    return checkOutRequest.pipe(
      tap(() => {
        this._reservationsCache?.removeFirstWhere(
          (cacheReservation) => cacheReservation.id === reservation.id,
        );

        this._makeCheckOutEvent.emit(reservation);
      }),
    );
  }
}
