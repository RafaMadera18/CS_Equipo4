namespace MrHotel.ApiService.Reservations.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Reservations.Data;
using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database.Entities.Reservations;

public static class RoomStatusEndpoint
{
    public static async Task<Ok<IEnumerable<RoomStatus>>> HandleGet(
        [FromServices] RoomManager roomManager)
    {
        Room[] rooms = await roomManager.GetRooms().ToArrayAsync();
        // TODO: Compute RoomState, depends on reservations
        IEnumerable<RoomStatus> result = rooms.Select(room => new RoomStatus(room, RoomState.Available));
        return TypedResults.Ok(result);
    }
}
