namespace MrHotel.ApiService.Rooms.Data;

using MrHotel.Database.Entities.Rooms;

public record RoomStatus(
    Room Room,
    // TODO: JsonConverter(typeof(JsonStringEnumConverter))
    RoomState State);
