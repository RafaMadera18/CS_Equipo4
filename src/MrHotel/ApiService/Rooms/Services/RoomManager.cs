namespace MrHotel.ApiService.Rooms.Services;

using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.Database;
using MrHotel.Database.Entities.Rooms;

public class RoomManager(AppDbContext db)
{
    public async Task AddRoom(Room room)
    {
        await db.Rooms.AddAsync(room);
    }

    public void DeleteRoom(Room room)
    {
        db.Rooms.Remove(room);
    }

    public void UpdateRoom(Room room)
    {
        db.Rooms.Update(room);
    }

    [Pure]
    public IQueryable<Room> GetRooms()
    {
        return db.Rooms.AsQueryable().AsNoTracking();
    }

    public Task SaveChanges()
    {
        return db.SaveChangesAsync();
    }
}
