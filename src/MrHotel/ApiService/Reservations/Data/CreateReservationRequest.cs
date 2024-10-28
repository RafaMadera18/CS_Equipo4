namespace MrHotel.ApiService.Reservations.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Reservations;

public record CreateReservationRequest(
    // TODO:
    // Guid GuestId,
    Guid RoomId,
    DateTimeOffset CheckInDate,
    DateTimeOffset CheckOutDate,
    decimal Price)
{
    [Pure]
    public Reservation Create()
    {
        return new()
        {
            Id = Guid.NewGuid(),
            // TODO
            // GuestId = this.GuestId,
            RoomId = this.RoomId,
            CheckInDate = this.CheckInDate,
            CheckOutDate = this.CheckOutDate,
            Price = this.Price,
        };
    }
}
