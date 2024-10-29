namespace MrHotel.ApiService.Rooms.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Reservations.Services;
using MrHotel.ApiService.Rooms.Data;
using MrHotel.ApiService.Rooms.Services;
using MrHotel.Database.Entities.Rooms;

public static class RoomsAvailabilityEndpoint
{
    public static async Task<Ok<IEnumerable<RoomAvailability>>> HandleGet(
        [FromServices] RoomManager roomManager,
        [FromServices] ReservationManager reservationManager)
    {
        RoomInfo[] rooms = await roomManager.GetRooms().ToArrayAsync();

        var availabilityContext = await RoomAvailabilityStateContext.Create(reservationManager);
        var availabilityManager = new RoomAvailabilityManager(availabilityContext);

        // RoomInfo -> RoomAvailability
        IEnumerable<RoomAvailability> roomsAvailability = rooms.Select(availabilityManager.GetRoomAvailability);

        return TypedResults.Ok(roomsAvailability);
    }
}
