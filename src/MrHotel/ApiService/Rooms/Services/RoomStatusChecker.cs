namespace MrHotel.ApiService.Rooms.Services;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Reservations.Services;
using MrHotel.ApiService.Rooms.Data;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;

#pragma warning disable S2325

public class RoomStatusChecker(
    ReservationManager reservationManager)
{
    public RoomState GetRoomState(
        Room room,
        RoomStatusContext context)
    {
        bool roomOccupied = context.ActiveReservations.Any(reservation => reservation.Room.Id == room.Id);
        if (roomOccupied)
        {
            return RoomState.Occupied;
        }

        // TODO: Check for maintenance & unavailable
        return RoomState.Available;
    }

    public RoomStatus GetRoomStatus(
        Room room,
        RoomStatusContext context)
    {
        RoomState roomState = this.GetRoomState(room, context);
        return new RoomStatus(room, roomState);
    }

    public IEnumerable<RoomStatus> GetRoomStatuses(
        IEnumerable<Room> rooms,
        RoomStatusContext context)
    {
        return rooms.Select(rooms => this.GetRoomStatus(rooms, context));
    }

    public async Task<RoomStatusContext> GetStatusContext()
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
