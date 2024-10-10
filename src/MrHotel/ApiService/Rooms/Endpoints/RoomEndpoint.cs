namespace MrHotel.ApiService.Rooms.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Rooms.Services;
using MrHotel.Database.Entities.Rooms;

public static class RoomEndpoint
{
    public static async Task<Ok<Guid>> HandlePost(
        [FromQuery] string name,
        [FromServices] RoomManager roomManager)
    {
        Room room = await roomManager.AddRoom(name);
        await roomManager.SaveChanges();
        return TypedResults.Ok(room.Id);
    }

    public static async Task<Results<Ok, NotFound>> HandleDelete(
        [FromQuery] Guid id,
        [FromServices] RoomManager roomManager)
    {
        Room? room = await roomManager
            .GetRooms()
            .FirstOrDefaultAsync(room => room.Id == id);

        if (room is null)
        {
            return TypedResults.NotFound();
        }

        roomManager.DeleteRoom(room);
        await roomManager.SaveChanges();
        return TypedResults.Ok();
    }
}
