namespace MrHotel.ApiService.Reservations.Data;

using MrHotel.Database.Entities.Reservations;

public record RoomStatus(
    Room Room,
    // TODO: JsonConverter(typeof(JsonStringEnumConverter))
    RoomState State);
