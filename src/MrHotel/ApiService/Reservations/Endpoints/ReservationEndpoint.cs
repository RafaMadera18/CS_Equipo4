namespace MrHotel.ApiService.Reservations.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Reservations.Data;
using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database.Entities.Reservations;

public static class ReservationEndpoint
{
    public static async Task<Ok<Guid>> HandlePost(
        [FromBody] CreateReservationRequest request,
        [FromServices] ReservationManager reservationManager)
    {
        Reservation reservation = await reservationManager.AddReservation(request);
        await reservationManager.SaveChanges();
        return TypedResults.Ok(reservation.Id);
    }
}
