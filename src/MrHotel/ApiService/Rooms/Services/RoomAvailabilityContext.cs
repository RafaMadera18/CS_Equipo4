namespace MrHotel.ApiService.Rooms.Services;

using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database.Entities.Reservations;

public record RoomAvailabilityContext(
    IReadOnlyCollection<ReservationInfo> ActiveReservations)
{
    public static async Task<RoomAvailabilityContext> Create(
        ReservationManager reservationManager)
    {
        return new RoomAvailabilityContext(
            await reservationManager.GetReservations(onlyActive: true));
    }
}
