namespace MrHotel.ApiService.Rooms.Endpoints;

using FluentValidation.Results;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.RoomPropertyGroups.Services;
using MrHotel.ApiService.Rooms.Data;
using MrHotel.ApiService.Rooms.Services;
using MrHotel.Database.Entities.Rooms;

public static class RoomEndpoints
{
    public static async Task<Results<Ok<Guid>, ValidationProblem>> HandlePost(
        [FromBody] RoomCreationData roomCreationData,
        [FromServices] RoomManager roomManager)
    {
        RoomInfo room = roomCreationData.ToRoomInfo();

        ValidationResult result = await roomManager.AddRoom(room);
        if (!result.IsValid)
        {
            return TypedResults.ValidationProblem(result.ToDictionary());
        }

        await roomManager.SaveChanges();

        return TypedResults.Ok(room.Id);
    }

    public static async Task<Results<NoContent, NotFound>> HandlePut(
        [FromRoute] Guid roomId,
        [FromBody] RoomUpdateData roomUpdateData,
        [FromServices] RoomManager roomManager,
        [FromServices] RoomPropertyGroupManager propertyGroupManager)
    {
        RoomInfo? room = await roomManager.TryGetRoomById(roomId);

        if (room is null)
        {
            return TypedResults.NotFound();
        }

        RoomUpdate roomUpdate = await roomUpdateData.ToRoomUpdate(propertyGroupManager);

        roomManager.UpdateRoom(room);
        roomUpdate.ApplyUpdate(room);
        await roomManager.SaveChanges();

        return TypedResults.NoContent();
    }

    public static async Task<Results<NoContent, NotFound>> HandleDelete(
        [FromRoute] Guid roomId,
        [FromServices] RoomManager roomManager)
    {
        RoomInfo? room = await roomManager.TryGetRoomById(roomId);

        if (room is null)
        {
            return TypedResults.NotFound();
        }

        roomManager.DeleteRoom(room);
        await roomManager.SaveChanges();

        return TypedResults.NoContent();
    }
}
