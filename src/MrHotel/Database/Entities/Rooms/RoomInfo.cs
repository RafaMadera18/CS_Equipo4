namespace MrHotel.Database.Entities.Rooms;

public class RoomInfo
{
    public Guid Id { get; init; }

    public required string Name { get; set; }

    public ICollection<RoomProperty> Properties { get; set; } = [];
}
