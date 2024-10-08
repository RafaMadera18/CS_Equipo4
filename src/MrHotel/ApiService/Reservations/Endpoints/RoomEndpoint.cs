namespace MrHotel.ApiService.Reservations.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Reservations.Services;

public static class RoomEndpoint
{
    public static async Task<Ok<Guid>> HandlePost(
        [FromQuery] string name,
        [FromServices] RoomManager roomManager)
    {
        var room = await roomManager.AddRoom(name);
        await roomManager.SaveChanges();
        return TypedResults.Ok(room.Id);
    }

    public static async Task<Results<Ok, NotFound>> HandleDelete(
        [FromQuery] Guid id,
        [FromServices] RoomManager roomManager)
    {
        if (await roomManager.GetRooms().FirstOrDefaultAsync(r => r.Id == id) is not { } room)
        {
            return TypedResults.NotFound();
        }

        roomManager.DeleteRoom(room);
        await roomManager.SaveChanges();
        return TypedResults.Ok();
    }
}
