namespace MrHotel.Database.Entities.Reservations;

using MrHotel.Database.Entities.Rooms;

public partial class Reservation
{
    public required Guid Id { get; set; }

    // TODO
    // public Guest Guest { get; set; } = null!;

    public Room Room { get; set; } = null!;

    public required DateTimeOffset CheckInDate { get; set; }

    public required DateTimeOffset CheckOutDate { get; set; }

    public bool CheckOutDone { get; set; }

    public decimal Price { get; set; }
}
