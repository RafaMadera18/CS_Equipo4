namespace MrHotel.ApiService.RoomPropertyGroups.Data;

using System.Diagnostics.Contracts;

using FluentValidation;
using FluentValidation.Results;

using MrHotel.ApiService.RoomPropertyGroups.Validation;
using MrHotel.Database.Entities.Rooms;

using RaptorUtils.Collections.Extensions;

public record RoomPropertyGroupUpdateData(
    string Name,
    IReadOnlyCollection<RoomPropertyUpdateData> PropertiesUpdates)
{
    [Pure]
    public bool IsValid(out ValidationResult result)
    {
        result = RoomPropertyGroupUpdateDataValidator.Instance.Validate(this);
        return result.IsValid;
    }

    public void ApplyUpdate(RoomPropertyGroup group)
    {
        group.Name = this.Name;

        IEnumerable<RoomProperty> newProperties = this.GetPropertiesWithValidId(group);

        group.Properties.Clear();
        group.Properties.AddRange(newProperties);
    }

    [Pure]
    private IEnumerable<RoomProperty> GetPropertiesWithValidId(RoomPropertyGroup group)
    {
        HashSet<Guid> propertyIdSet = GetPropertyIdSet(group);

        return this.CreatePropertiesFromUpdates(group)
            .Where(p => p.Id == Guid.Empty || propertyIdSet.Contains(p.Id));
    }

    [Pure]
    private static HashSet<Guid> GetPropertyIdSet(RoomPropertyGroup group)
    {
        return group.Properties.Select(g => g.Id).ToHashSet();
    }

    [Pure]
    private IEnumerable<RoomProperty> CreatePropertiesFromUpdates(RoomPropertyGroup group)
    {
        return this.PropertiesUpdates.Select(p => p.ToRoomProperty(group));
    }
}
