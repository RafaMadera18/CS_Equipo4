namespace MrHotel.ApiService.Rooms.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Rooms.Data;
using MrHotel.ApiService.Rooms.Services;
using MrHotel.Database.Entities.Rooms;

public static class RoomEndpoint
{
    public static async Task<Ok<Guid>> HandlePost(
        [FromBody] CreateRoomRequest request,
        [FromServices] RoomManager roomManager)
    {
        Room room = request.Create();

        await roomManager.AddRoom(room);
        await roomManager.SaveChanges();

        return TypedResults.Ok(room.Id);
    }

    public static async Task<Results<Ok, NotFound>> HandleDelete(
        [FromRoute] Guid roomId,
        [FromServices] RoomManager roomManager)
    {
        Room? room = await roomManager
            .GetRooms()
            .FirstOrDefaultAsync(room => room.Id == roomId);

        if (room is null)
        {
            return TypedResults.NotFound();
        }

        roomManager.DeleteRoom(room);
        await roomManager.SaveChanges();

        return TypedResults.Ok();
    }
}
