namespace MrHotel.ApiService.Rooms.Services;

using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;

public class RoomStateChecker(
    ReservationManager reservationManager)
{
    [Pure]
    public RoomState GetRoomState(
        Room room,
        RoomStateContext context)
    {
        bool roomOccupied = context.ActiveReservations.Any(reservation => reservation.Room.Id == room.Id);
        if (roomOccupied)
        {
            return RoomState.Occupied;
        }

        // TODO: Check for maintenance & unavailable
        return RoomState.Available;
    }

    public async Task<RoomStateContext> GetStateContext()
    {
        return new(ActiveReservations: await this.GetActiveReservations());
    }

    private Task<Reservation[]> GetActiveReservations()
    {
        return reservationManager
            .GetReservations()
            .Where(reservation => !reservation.CheckOutDone)
            .Include(reservation => reservation.Room)
            .ToArrayAsync();
    }
}
