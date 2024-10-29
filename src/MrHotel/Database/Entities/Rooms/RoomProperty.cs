namespace MrHotel.Database.Entities.Rooms;

public class RoomProperty
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public required RoomPropertyGroup Group { get; set; }
}
