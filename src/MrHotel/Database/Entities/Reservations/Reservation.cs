namespace MrHotel.Database.Entities.Reservations;

public class Reservation
{
    public Guid Id { get; set; }

    public required Guest Guest { get; set; }

    public required Room Room { get; set; }

    public DateTimeOffset CheckInDate { get; set; }

    public DateTimeOffset CheckOutDate { get; set; }

    public bool CheckOutDone { get; set; }

    public decimal Price { get; set; }
}
