namespace MrHotel.ApiService.RoomPropertyGroups.Services;

using System.Diagnostics.Contracts;

using FluentValidation.Results;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.ApiService.RoomPropertyGroups.Validation;
using MrHotel.Database.Entities.Rooms;

public class RoomPropertyGroupManager(
    IEntityRepository<RoomPropertyGroup> propertyStorage)
{
    private readonly RoomPropertyGroupAddingValidator addingValidator = new(propertyStorage.EntitySet);

    public async Task<ValidationResult> AddPropertyGroup(RoomPropertyGroup propertyGroup)
    {
        ValidationResult result = await this.addingValidator.ValidateAsync(propertyGroup);
        if (result.IsValid)
        {
            await propertyStorage.EntitySet.AddAsync(propertyGroup);
        }

        return result;
    }

    [Pure]
    public Task<RoomPropertyGroup?> TryGetPropertyGroupById(Guid id)
    {
        return this.QueryPropertyGroups()
            .FirstOrDefaultAsync(group => group.Id == id);
    }

    [Pure]
    public async Task<IReadOnlyCollection<RoomPropertyGroup>> GetPropertyGroups()
    {
        return await this.QueryPropertyGroups().ToArrayAsync();
    }

    public void UpdatePropertyGroup(RoomPropertyGroup propertyGroup)
    {
        propertyStorage.EntitySet.Update(propertyGroup);
    }

    public void DeletePropertyGroup(RoomPropertyGroup propertyGroup)
    {
        propertyStorage.EntitySet.Remove(propertyGroup);
    }

    public Task SaveChanges()
    {
        return propertyStorage.SaveChanges();
    }

    private IQueryable<RoomPropertyGroup> QueryPropertyGroups()
    {
        return propertyStorage.EntitySet
            .Include(group => group.Properties);
    }
}
