namespace MrHotel.ApiService.Rooms.Data;

using MrHotel.Database.Entities.Rooms;

using RaptorUtils.Collections.Extensions;

public record RoomUpdateData(
    string Name,
    IReadOnlyCollection<Guid> PropertiesIds)
{
    public void Update(RoomInfo room)
    {
        room.Name = this.Name;

        this.UpdateProperties(room.Properties);
    }

    private void UpdateProperties(ICollection<RoomProperty> properties)
    {
        properties.Clear();

        IEnumerable<RoomProperty> newProperties = this.GetNewProperties();
        properties.AddRange(newProperties);
    }

    private IEnumerable<RoomProperty> GetNewProperties()
    {
        return this.PropertiesIds
            .Select(id => new RoomProperty() { Id = id });
    }
}
