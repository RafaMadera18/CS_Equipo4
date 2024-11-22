namespace MrHotel.Database.Entities.Rooms;

using System.Text.Json.Serialization;

public partial class RoomProperty
{
    public Guid GroupId { get; init; }

    [JsonIgnore]
    internal ICollection<RoomInfo> Rooms { get; set; } = [];
}
