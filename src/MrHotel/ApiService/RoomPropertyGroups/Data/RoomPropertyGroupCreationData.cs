namespace MrHotel.ApiService.RoomPropertyGroups.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Rooms;

public record RoomPropertyGroupCreationData(string Name)
{
    [Pure]
    public RoomPropertyGroup ToRoomPropertyGroup()
    {
        return new()
        {
            Name = this.Name,
        };
    }
}
