namespace MrHotel.ApiService.Rooms.Data;

using MrHotel.Database.Entities.Rooms;

public record UpdateRoomRequest(string Name)
{
    public void Update(RoomInfo room)
    {
        room.Name = this.Name;
    }
}
