namespace MrHotel.Database.Entities.Rooms;

public partial class RoomProperty
{
    internal ICollection<RoomInfo> Rooms { get; set; } = [];
}
