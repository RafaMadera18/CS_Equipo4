namespace MrHotel.ApiService.Reservations.Services;

using System.Diagnostics.Contracts;

using MrHotel.Database;
using MrHotel.Database.Entities.Reservations;

public class RoomManager(AppDbContext db)
{
    public async Task<Room> AddRoom(string name)
    {
        var room = Room.Create(name);
        await db.Rooms.AddAsync(room);
        return room;
    }

    public void DeleteRoom(Room room)
    {
        db.Rooms.Remove(room);
    }

    [Pure]
    public IQueryable<Room> GetRooms()
    {
        return db.Rooms.AsQueryable();
    }

    public Task SaveChanges()
    {
        return db.SaveChangesAsync();
    }
}
