namespace MrHotel.ApiService.Rooms.Services;

using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.ApiService.Core.Validation;
using MrHotel.Database.Entities.Rooms;

using RaptorUtils.Collections.Extensions;

public class RoomManager(
    IEntityRepository<RoomInfo> roomStorage)
{
    public async Task<ValidationResult> AddRoom(RoomInfo room)
    {
        ValidationResult result = await this.ValidateRoomForAdding(room);
        if (result.Succeeded)
        {
            roomStorage.EntitySet.Add(room);
        }

        return result;
    }

    [Pure]
    public bool TryGetRoomById(
        Guid id,
        [MaybeNullWhen(false)] out RoomInfo room)
    {
        room = roomStorage.EntitySet.Find(id);
        return room is not null;
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

    [Pure]
    private async Task<ValidationResult> ValidateRoomForAdding(RoomInfo room)
    {
        RoomInfo[] conflictRooms = await roomStorage.EntitySet
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
