namespace MrHotel.Database.Entities.Reservations;

public partial class Reservation
{
    public Guid GuestId { get; set; }

    public Guid RoomId { get; set; }
}
