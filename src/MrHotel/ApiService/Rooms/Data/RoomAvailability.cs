namespace MrHotel.ApiService.Rooms.Data;

using MrHotel.Database.Entities.Rooms;

public record RoomAvailability(
    RoomInfo Room,
    RoomAvailabilityState State);
