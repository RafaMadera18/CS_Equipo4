namespace MrHotel.Database.Entities.Reservations;

public partial class ReservationInfo
{
    public Guid GuestId { get; set; }

    public Guid RoomId { get; set; }
}
