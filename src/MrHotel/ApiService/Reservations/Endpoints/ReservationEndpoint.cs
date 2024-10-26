namespace MrHotel.ApiService.Reservations.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.Reservations.Data;
using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database.Entities.Reservations;

public static class ReservationEndpoint
{
    public static async Task<Ok<Guid>> HandlePost(
        [FromBody] CreateReservationRequest request,
        [FromServices] ReservationManager reservationManager)
    {
        Reservation reservation = request.Create();

        await reservationManager.AddReservation(reservation);
        await reservationManager.SaveChanges();

        return TypedResults.Ok(reservation.Id);
    }
}
