namespace MrHotel.ApiService.Rooms.Services;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database.Entities.Reservations;

public record RoomAvailabilityContext(
    IReadOnlyCollection<ReservationInfo> ActiveReservations)
{
    public static async Task<RoomAvailabilityContext> Create(
        ReservationManager reservationManager)
    {
        var activeReservations = await GetActiveReservations(reservationManager);

        return new RoomAvailabilityContext(activeReservations);
    }

    private static async Task<IReadOnlyCollection<ReservationInfo>> GetActiveReservations(
        ReservationManager reservationManager)
    {
        return await reservationManager
            .GetReservations()
            .Where(reservation => !reservation.CheckOutDone)
            .ToArrayAsync();
    }
}
