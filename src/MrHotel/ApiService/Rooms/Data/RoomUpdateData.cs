namespace MrHotel.ApiService.Rooms.Data;

using MrHotel.ApiService.RoomPropertyGroups.Services;
using MrHotel.Database.Entities.Rooms;

public record RoomUpdateData(
    string Name,
    IReadOnlyCollection<Guid> PropertiesIds)
{
    public async Task<RoomUpdate> ToRoomUpdate(
        RoomPropertyGroupManager propertyGroupManager)
    {
        IEnumerable<RoomPropertyGroup> groups = await propertyGroupManager.GetPropertyGroups();
        IEnumerable<RoomProperty> properties = this.GetIncludedProperties(groups);

        return new RoomUpdate(this.Name, properties.ToList());
    }

    private IEnumerable<RoomProperty> GetIncludedProperties(IEnumerable<RoomPropertyGroup> groups)
    {
        return groups
            .SelectMany(g => g.Properties)
            .Where(p => this.PropertiesIds.Contains(p.Id));
    }
}
