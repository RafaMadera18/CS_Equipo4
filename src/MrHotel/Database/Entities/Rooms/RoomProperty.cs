namespace MrHotel.Database.Entities.Rooms;

public class RoomProperty
{
    public Guid Id { get; init; }

    public required string Name { get; set; }

    public required RoomPropertyGroup Group { get; set; }
}
