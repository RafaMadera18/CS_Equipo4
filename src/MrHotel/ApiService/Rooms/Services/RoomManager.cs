namespace MrHotel.ApiService.Rooms.Services;

using System.Diagnostics.Contracts;

using FluentValidation.Results;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.ApiService.Rooms.Validation;
using MrHotel.Database.Entities.Rooms;

public class RoomManager(
    IEntityRepository<RoomInfo> roomStorage)
{
    private readonly RoomAddingValidator addingValidator = new(roomStorage.EntitySet);

    public async Task<ValidationResult> AddRoom(RoomInfo room)
    {
        ValidationResult result = await this.addingValidator.ValidateAsync(room);
        if (result.IsValid)
        {
            await roomStorage.EntitySet.AddAsync(room);
        }

        return result;
    }

    [Pure]
    public Task<RoomInfo?> TryGetRoomById(Guid id)
    {
        return this.QueryRooms()
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    [Pure]
    public async Task<IReadOnlyCollection<RoomInfo>> GetRooms()
    {
        return await this.QueryRooms().ToArrayAsync();
    }

    public void UpdateRoom(RoomInfo room)
    {
        roomStorage.EntitySet.Update(room);
    }

    public void DeleteRoom(RoomInfo room)
    {
        roomStorage.EntitySet.Remove(room);
    }

    public Task SaveChanges()
    {
        return roomStorage.SaveChanges();
    }

    private IQueryable<RoomInfo> QueryRooms()
    {
        return roomStorage.EntitySet
            .Include(r => r.Properties)
            .ThenInclude(p => p.Group);
    }
}
