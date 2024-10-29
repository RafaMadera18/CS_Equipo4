namespace MrHotel.Database.Entities.Rooms;

public class RoomPropertyGroup
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public ICollection<RoomProperty> Properties { get; set; } = [];
}
