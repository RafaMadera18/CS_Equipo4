namespace MrHotel.ApiService.Guests.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Validation;
using MrHotel.ApiService.Guests.Data;
using MrHotel.ApiService.Guests.Services;
using MrHotel.Database.Entities.Guests;

public static class GuestEndpoints
{
    public static async Task<Results<Ok<Guid>, ValidationProblem>> HandlePost(
        [FromBody] CreateGuestRequest request,
        [FromServices] GuestManager guestManager)
    {
        GuestInfo guest = request.Create();

        ValidationResult result = await guestManager.AddGuest(guest);
        if (!result.Succeeded)
        {
            return TypedResults.ValidationProblem(result.AsErrorDictionary());
        }

        await guestManager.SaveChanges();

        return TypedResults.Ok(guest.Id);
    }

    public static async Task<Ok<IEnumerable<GuestInfo>>> HandleGet(
        [FromServices] GuestManager guestManager)
    {
        IEnumerable<GuestInfo> guests = await guestManager.GetGuests().ToArrayAsync();

        return TypedResults.Ok(guests);
    }

    public static async Task<Results<NoContent, NotFound>> HandleDelete(
        [FromRoute] Guid guestId,
        [FromServices] GuestManager guestManager)
    {
        GuestInfo? guest = await guestManager
            .GetGuests()
            .FirstOrDefaultAsync(guest => guest.Id == guestId);

        if (guest is null)
        {
            return TypedResults.NotFound();
        }

        guestManager.DeleteGuest(guest);
        await guestManager.SaveChanges();

        return TypedResults.NoContent();
    }
}
