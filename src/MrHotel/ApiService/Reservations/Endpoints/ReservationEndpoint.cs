﻿namespace MrHotel.ApiService.Reservations.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.Reservations.Data;
using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database.Entities.Reservations;

public static class ReservationEndpoint
{
    public static async Task<Ok<Guid>> HandlePost(
        [FromBody] ReservationCreationData reservationCreationData,
        [FromServices] ReservationManager reservationManager)
    {
        ReservationInfo reservation = reservationCreationData.ToReservationInfo();

        await reservationManager.AddReservation(reservation);
        await reservationManager.SaveChanges();

        return TypedResults.Ok(reservation.Id);
    }

    public static async Task<Results<Ok, NotFound>> HandleCheckout(
        [FromRoute] Guid reservationId,
        [FromServices] ReservationManager reservationManager)
    {
        ReservationInfo? reservation = await reservationManager.TryGetReservationById(reservationId, onlyActive: true);
        if (reservation == null)
        {
            return TypedResults.NotFound();
        }

        reservationManager.UpdateReservation(reservation);
        reservation.CheckOutDone = true;

        await reservationManager.SaveChanges();

        return TypedResults.Ok();
    }
}
