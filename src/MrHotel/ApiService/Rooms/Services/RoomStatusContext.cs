namespace MrHotel.ApiService.Rooms.Services;

using MrHotel.Database.Entities.Reservations;

public record RoomStatusContext(
    IReadOnlyCollection<Reservation> ActiveReservations);
