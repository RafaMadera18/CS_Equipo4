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
    public ValueTask<RoomInfo?> TryGetRoomById(Guid id)
    {
        // TODO: Include properties?
        return roomStorage.EntitySet.FindAsync(id);
    }

    [Pure]
    public async Task<IReadOnlyCollection<RoomInfo>> GetRooms()
    {
        return await roomStorage.EntitySet.ToArrayAsync();
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
}
