namespace MrHotel.ApiService.Rooms.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Rooms;

public record CreateRoomRequest(string Name)
{
    [Pure]
    public RoomInfo Create()
    {
        return new()
        {
            Id = Guid.NewGuid(),
            Name = this.Name.Trim(),
        };
    }
}
