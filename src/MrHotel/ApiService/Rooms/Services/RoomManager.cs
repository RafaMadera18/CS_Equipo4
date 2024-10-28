namespace MrHotel.ApiService.Rooms.Services;

using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Validation;
using MrHotel.Database;
using MrHotel.Database.Entities.Rooms;

using RaptorUtils.Collections.Extensions;

public class RoomManager(AppDbContext db)
{
    public async Task<ValidationResult> AddRoom(Room room)
    {
        ValidationResult result = await this.ValidateRoomForAdding(room);
        if (result.Succeeded)
        {
            db.Rooms.Add(room);
        }

        return result;
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

    private async Task<ValidationResult> ValidateRoomForAdding(Room room)
    {
        Room[] conflictRooms = await this.GetRooms()
            .Where(r => r.Id == room.Id || r.Name == room.Name)
            .ToArrayAsync();

        if (conflictRooms.Length == 0)
        {
            return ValidationResult.Success;
        }

        List<ValidationError> errors = [];

        if (conflictRooms.Any(r => r.Id == room.Id))
        {
            errors.Add(new ValidationError("DuplicateId", "Duplicate room id"));
        }

        if (conflictRooms.Any(r => r.Name == room.Name))
        {
            errors.Add(new ValidationError("DuplicateName", "Duplicate room name"));
        }

        return ValidationResult.Failed(errors);
    }
}
