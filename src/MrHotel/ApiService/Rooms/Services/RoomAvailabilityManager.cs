namespace MrHotel.ApiService.Rooms.Services;

using System.Diagnostics.Contracts;

using MrHotel.ApiService.Reservations.Services;
using MrHotel.ApiService.Rooms.Data;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;

public class RoomAvailabilityManager(
    ReservationManager reservationManager)
{
    private RoomAvailabilityContext? availabilityContextCache;

    [Pure]
    public async ValueTask<IEnumerable<RoomAvailability>> GetRoomsAvailability(IEnumerable<RoomInfo> rooms)
    {
        return await rooms.ToAsyncEnumerable()
            .SelectAwait(this.GetRoomAvailability)
            .ToArrayAsync();
    }

    [Pure]
    public async ValueTask<RoomAvailability> GetRoomAvailability(RoomInfo room)
    {
        RoomAvailabilityState roomState = await this.GetRoomState(room);
        ReservationInfo? activeReservation = await this.TryGetActiveReservation(room, roomState);

        return new RoomAvailability(room, roomState, activeReservation);
    }

    [Pure]
    private async ValueTask<RoomAvailabilityState> GetRoomState(RoomInfo room)
    {
        RoomAvailabilityContext context = await this.GetRoomAvailabilityContext();
        bool roomOccupied = context.ActiveReservations.Any(reservation => reservation.Room.Id == room.Id);
        if (roomOccupied)
        {
            return RoomAvailabilityState.Occupied;
        }

        // TODO: Check for maintenance & unavailable
        return RoomAvailabilityState.Available;
    }

    private async Task<ReservationInfo?> TryGetActiveReservation(
        RoomInfo room,
        RoomAvailabilityState roomState)
    {
        if (roomState != RoomAvailabilityState.Occupied)
        {
            return null;
        }

        RoomAvailabilityContext context = await this.GetRoomAvailabilityContext();

        return context.ActiveReservations.First(reservation => reservation.Room.Id == room.Id);
    }

    [Pure]
    private async ValueTask<RoomAvailabilityContext> GetRoomAvailabilityContext()
    {
        return this.availabilityContextCache
            ??= await RoomAvailabilityContext.Create(reservationManager);
    }
}
