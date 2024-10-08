namespace MrHotel.Database.Entities.Reservations;

public class Tag
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required TagGroup Group { get; set; }
}
