namespace MrHotel.ApiService.Rooms.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Rooms;

public record RoomCreationData(string Name)
{
    [Pure]
    public RoomInfo ToRoomInfo()
    {
        return new()
        {
            Id = Guid.NewGuid(),
            Name = this.Name.Trim(),
        };
    }
}
