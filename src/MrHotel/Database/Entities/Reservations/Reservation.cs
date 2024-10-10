namespace MrHotel.Database.Entities.Reservations;

using MrHotel.Database.Entities.Rooms;

public class Reservation
{
    public Guid Id { get; set; }

    // TODO
    /*
    public Guid GuestId { get; set; }

    public Guest Guest { get; set; } = null!;
    */

    public Guid RoomId { get; set; }

    public Room Room { get; set; } = null!;

    public DateTimeOffset CheckInDate { get; set; }

    public DateTimeOffset CheckOutDate { get; set; }

    public bool CheckOutDone { get; set; }

    public decimal Price { get; set; }
}
