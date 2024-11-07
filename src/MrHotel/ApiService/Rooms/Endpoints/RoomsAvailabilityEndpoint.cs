namespace MrHotel.ApiService.Rooms.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.Rooms.Data;
using MrHotel.ApiService.Rooms.Services;
using MrHotel.Database.Entities.Rooms;

public static class RoomsAvailabilityEndpoint
{
    public static async Task<Ok<IEnumerable<RoomAvailability>>> HandleGet(
        [FromServices] RoomManager roomManager,
        [FromServices] RoomAvailabilityManager availabilityManager)
    {
        IEnumerable<RoomInfo> rooms = await roomManager.GetRooms();

        IEnumerable<RoomAvailability> roomsAvailability = await availabilityManager.GetRoomsAvailability(rooms);

        return TypedResults.Ok(roomsAvailability);
    }
}
