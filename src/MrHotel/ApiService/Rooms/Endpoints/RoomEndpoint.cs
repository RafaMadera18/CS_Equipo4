namespace MrHotel.ApiService.Rooms.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Validation;
using MrHotel.ApiService.Rooms.Data;
using MrHotel.ApiService.Rooms.Services;
using MrHotel.Database.Entities.Rooms;

public static class RoomEndpoint
{
    public static async Task<Results<Ok<Guid>, ValidationProblem>> HandlePost(
        [FromBody] CreateRoomRequest request,
        [FromServices] RoomManager roomManager)
    {
        Room room = request.Create();

        ValidationResult result = await roomManager.AddRoom(room);
        if (!result.Succeeded)
        {
            return TypedResults.ValidationProblem(result.AsErrorDictionary());
        }

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

    public static async Task<IResult> HandlePut(
        [FromRoute] Guid roomId,
        [FromBody] UpdateRoomRequest request,
        [FromServices] RoomManager roomManager)
    {
        Room? room = await roomManager
            .GetRooms()
            .FirstOrDefaultAsync(room => room.Id == roomId);

        if (room is null)
        {
            return TypedResults.NotFound();
        }

        request.Update(room);
        roomManager.UpdateRoom(room);
        await roomManager.SaveChanges();
        return TypedResults.NoContent();
    }
}
