namespace MrHotel.ApiService.Rooms.Data;

using MrHotel.Database.Entities.Rooms;

public record CreateRoomRequest(string Name)
{
    public Room Create()
    {
        return new()
        {
            Id = Guid.NewGuid(),
            Name = this.Name,
        };
    }
}
