namespace MrHotel.ApiService.Guests.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.Guests.Data;
using MrHotel.ApiService.Guests.Services;
using MrHotel.Database.Entities.Guests;

public static class GuestEndpoints
{
    public static async Task<Ok<Guid>> HandlePost(
        [FromBody] CreateGuestRequest request,
        [FromServices] GuestManager guestManager)
    {
        Guest guest = request.Create();

        guestManager.AddGuest(guest);
        await guestManager.SaveChanges();

        return TypedResults.Ok(guest.Id);
    }
}
