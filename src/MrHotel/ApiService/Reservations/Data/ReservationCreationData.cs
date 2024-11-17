namespace MrHotel.ApiService.Reservations.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Reservations;

public record ReservationCreationData(
    Guid GuestId,
    Guid RoomId,
    DateTimeOffset CheckInDate,
    DateTimeOffset CheckOutDate,
    float Price)
{
    [Pure]
    public ReservationInfo ToReservationInfo()
    {
        return new()
        {
            GuestId = this.GuestId,
            RoomId = this.RoomId,
            CheckInDate = this.CheckInDate,
            CheckOutDate = this.CheckOutDate,
            Price = this.Price,
        };
    }
}
