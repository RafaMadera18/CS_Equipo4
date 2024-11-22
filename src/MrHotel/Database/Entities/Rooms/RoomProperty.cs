namespace MrHotel.Database.Entities.Rooms;

using System.Text.Json.Serialization;

public partial class RoomProperty
{
    public Guid Id { get; init; }

    public string Name { get; set; } = null!;

    [JsonIgnore]
    public RoomPropertyGroup Group { get; set; } = null!;
}
