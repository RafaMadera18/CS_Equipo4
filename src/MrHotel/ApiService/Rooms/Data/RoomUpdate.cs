namespace MrHotel.ApiService.Rooms.Data;

using MrHotel.Database.Entities.Rooms;

using RaptorUtils.Collections.Extensions;

public record RoomUpdate(
    string Name,
    IReadOnlyCollection<RoomProperty> Properties)
{
    public void ApplyUpdate(RoomInfo room)
    {
        room.Name = this.Name;

        room.Properties.Clear();
        room.Properties.AddRange(this.Properties);
    }
}
