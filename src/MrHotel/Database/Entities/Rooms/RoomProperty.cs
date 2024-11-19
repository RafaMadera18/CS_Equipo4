namespace MrHotel.Database.Entities.Rooms;

using System.Text.Json.Serialization;

public class RoomProperty
{
    public Guid Id { get; init; }

    public required string Name { get; set; }

    [JsonIgnore]
    public RoomPropertyGroup Group { get; set; } = null!;
}
