namespace MrHotel.ApiService.Rooms.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Rooms;

public record UpdateRoomRequest(string Name)
{

    public void Update(Room room)
    {
        room.Name = this.Name;
    }
}
