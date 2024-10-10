namespace MrHotel.ApiService.Rooms.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Rooms.Data;
using MrHotel.ApiService.Rooms.Services;
using MrHotel.Database.Entities.Rooms;

public static class RoomStatusEndpoint
{
    public static async Task<Ok<IEnumerable<RoomStatus>>> HandleGet(
        [FromServices] RoomManager roomManager,
        [FromServices] RoomStateChecker roomStateChecker)
    {
        Room[] rooms = await roomManager.GetRooms().ToArrayAsync();

        RoomStateContext context = await roomStateChecker.GetStateContext();

        IEnumerable<RoomStatus> roomStatuses = rooms.Select(
            room =>
            {
                RoomState roomState = roomStateChecker.GetRoomState(room, context);
                return new RoomStatus(room, roomState);
            });

        return TypedResults.Ok(roomStatuses);
    }
}
