namespace MrHotel.ApiService.RoomPropertyGroups.Data;

using MrHotel.Database.Entities.Rooms;

public record RoomPropertyUpdateData(
    Guid? Id,
    string Name)
{
    public RoomProperty ToRoomProperty(RoomPropertyGroup group)
    {
        return new()
        {
            Id = this.Id ?? Guid.Empty,
            Name = this.Name,
            Group = group,
        };
    }
}
