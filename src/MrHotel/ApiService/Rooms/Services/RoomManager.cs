namespace MrHotel.ApiService.Rooms.Services;

using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Rooms.Data;
using MrHotel.Database;
using MrHotel.Database.Entities.Rooms;

public class RoomManager(AppDbContext db)
{
    public async Task<Room> AddRoom(
        CreateRoomRequest request)
    {
        var room = request.Create();
        await db.Rooms.AddAsync(room);
        return room;
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
