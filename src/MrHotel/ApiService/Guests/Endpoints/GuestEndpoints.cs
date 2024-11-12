﻿namespace MrHotel.ApiService.Guests.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.Core.Validation;
using MrHotel.ApiService.Guests.Data;
using MrHotel.ApiService.Guests.Services;
using MrHotel.Database.Entities.Guests;

public static class GuestEndpoints
{
    public static async Task<Results<Ok<Guid>, ValidationProblem>> HandlePost(
        [FromBody] GuestCreationData guestCreationData,
        [FromServices] GuestManager guestManager)
    {
        GuestInfo guest = guestCreationData.ToGuestInfo();

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
        IEnumerable<GuestInfo> guests = await guestManager.GetGuests();

        return TypedResults.Ok(guests);
    }

    public static async Task<Results<NoContent, NotFound>> HandlePut(
        [FromRoute] Guid guestId,
        [FromBody] GuestUpdateData guestUpdateData,
        [FromServices] GuestManager guestManager)
    {
        if (!guestManager.TryGetGuestById(guestId, out GuestInfo? guest))
        {
            return TypedResults.NotFound();
        }

        guestUpdateData.ApplyUpdate(guest);
        guestManager.UpdateGuest(guest);
        await guestManager.SaveChanges();

        return TypedResults.NoContent();
    }

    public static async Task<Results<NoContent, NotFound>> HandleDelete(
        [FromRoute] Guid guestId,
        [FromServices] GuestManager guestManager)
    {
        if (!guestManager.TryGetGuestById(guestId, out GuestInfo? guest))
        {
            return TypedResults.NotFound();
        }

        guestManager.DeleteGuest(guest);
        await guestManager.SaveChanges();

        return TypedResults.NoContent();
    }
}
