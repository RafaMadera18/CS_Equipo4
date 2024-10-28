namespace MrHotel.Database.Entities.Reservations;

using MrHotel.Database.Entities.Guests;
using MrHotel.Database.Entities.Rooms;

public partial class Reservation
{
    public required Guid Id { get; set; }

    public Guest Guest { get; set; } = null!;

    public Room Room { get; set; } = null!;

    public required DateTimeOffset CheckInDate { get; set; }

    public required DateTimeOffset CheckOutDate { get; set; }

    public bool CheckOutDone { get; set; }

    public float Price { get; set; }
}
