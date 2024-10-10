namespace MrHotel.ApiService.Rooms.Services;

using MrHotel.Database.Entities.Reservations;

public record RoomStateContext(
    IReadOnlyCollection<Reservation> ActiveReservations);
