namespace MrHotel.ApiService.Rooms.Services;

using System.Diagnostics.Contracts;

using MrHotel.ApiService.Rooms.Data;
using MrHotel.Database.Entities.Rooms;

public class RoomAvailabilityManager(
    RoomAvailabilityStateContext availabilityContext)
{
    [Pure]
    public RoomAvailability GetRoomAvailability(RoomInfo room)
    {
        RoomAvailabilityState roomState = this.GetRoomState(room);
        return new RoomAvailability(room, roomState);
    }

    [Pure]
    private RoomAvailabilityState GetRoomState(RoomInfo room)
    {
        bool roomOccupied = availabilityContext.ActiveReservations.Any(reservation => reservation.Room.Id == room.Id);
        if (roomOccupied)
        {
            return RoomAvailabilityState.Occupied;
        }

        // TODO: Check for maintenance & unavailable
        return RoomAvailabilityState.Available;
    }
}
