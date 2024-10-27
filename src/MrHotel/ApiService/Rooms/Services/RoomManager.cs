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

    [Pure]
    public IQueryable<Room> GetRooms(
        QueryTrackingBehavior trackingBehavior = QueryTrackingBehavior.NoTracking)
    {
        return db.Rooms
            .AsQueryable()
            .AsTracking(trackingBehavior);
    }

    public Task SaveChanges()
    {
        return db.SaveChangesAsync();
    }
}
