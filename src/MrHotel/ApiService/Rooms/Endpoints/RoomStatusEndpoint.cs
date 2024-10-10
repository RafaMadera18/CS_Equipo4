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
        [FromServices] RoomStatusChecker roomStatusChecker)
    {
        Room[] rooms = await roomManager
            .GetRooms()
            .ToArrayAsync();

        RoomStatusContext context = await roomStatusChecker.GetStatusContext();
        IEnumerable<RoomStatus> roomStatuses = roomStatusChecker.GetRoomStatuses(rooms, context);

        return TypedResults.Ok(roomStatuses);
    }
}
