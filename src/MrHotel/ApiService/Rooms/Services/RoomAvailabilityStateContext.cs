namespace MrHotel.ApiService.Rooms.Services;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database.Entities.Reservations;

public record RoomAvailabilityStateContext(
    IReadOnlyCollection<ReservationInfo> ActiveReservations)
{
    public static async Task<RoomAvailabilityStateContext> Create(
        ReservationManager reservationManager)
    {
        var activeReservations = await GetActiveReservations(reservationManager);

        return new RoomAvailabilityStateContext(activeReservations);
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
