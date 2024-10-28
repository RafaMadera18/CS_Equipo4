namespace MrHotel.ApiService.Reservations.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Reservations;

public record CreateReservationRequest(
    Guid GuestId,
    Guid RoomId,
    DateTimeOffset CheckInDate,
    DateTimeOffset CheckOutDate,
    float Price)
{
    [Pure]
    public Reservation Create()
    {
        return new()
        {
            Id = Guid.NewGuid(),
            GuestId = this.GuestId,
            RoomId = this.RoomId,
            CheckInDate = this.CheckInDate,
            CheckOutDate = this.CheckOutDate,
            Price = this.Price,
        };
    }
}
