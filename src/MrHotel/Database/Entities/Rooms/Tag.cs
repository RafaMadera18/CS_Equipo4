namespace MrHotel.Database.Entities.Rooms;

public class Tag
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public required TagGroup Group { get; set; }
}
