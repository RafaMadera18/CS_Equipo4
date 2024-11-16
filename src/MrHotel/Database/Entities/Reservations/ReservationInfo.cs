namespace MrHotel.Database.Entities.Reservations;

using MrHotel.Database.Entities.Guests;
using MrHotel.Database.Entities.Rooms;

public partial class ReservationInfo
{
    public Guid Id { get; init; }

    public GuestInfo Guest { get; set; } = null!;

    public RoomInfo Room { get; set; } = null!;

    public required DateTimeOffset CheckInDate { get; set; }

    public required DateTimeOffset CheckOutDate { get; set; }

    public bool CheckOutDone { get; set; }

    public float Price { get; set; }
}
