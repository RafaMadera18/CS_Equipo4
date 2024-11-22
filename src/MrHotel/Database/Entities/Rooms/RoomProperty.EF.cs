namespace MrHotel.Database.Entities.Rooms;

using System.Text.Json.Serialization;

public partial class RoomProperty
{
    [JsonIgnore]
    internal ICollection<RoomInfo> Rooms { get; set; } = [];
}
