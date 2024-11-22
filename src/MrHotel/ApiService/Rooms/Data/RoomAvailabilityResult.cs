namespace MrHotel.ApiService.Rooms.Data;

using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;

#pragma warning disable SA1402

public record RoomAvailabilityResult(
    RoomAvailabilityRoomInfo Room,
    RoomAvailabilityState State,
    ReservationInfo? ActiveReservation)
{
    public static IEnumerable<RoomAvailabilityResult> FromAvailability(IEnumerable<RoomAvailability> availabilities)
    {
        return availabilities.Select(FromAvailability);
    }

    public static RoomAvailabilityResult FromAvailability(RoomAvailability availability)
    {
        var mappedRoom = RoomAvailabilityRoomInfo.FromRoomInfo(availability.Room);
        return new(mappedRoom, availability.State, availability.ActiveReservation);
    }
}

public record RoomAvailabilityRoomInfo(
    Guid Id,
    string Name,
    ICollection<RoomAvailabilityRoomProperty> Properties)
{
    public static RoomAvailabilityRoomInfo FromRoomInfo(RoomInfo room)
    {
        var mappedProperties = room.Properties.Select(RoomAvailabilityRoomProperty.FromRoomProperty).ToArray();
        return new(room.Id, room.Name, mappedProperties);
    }
}

public record RoomAvailabilityRoomProperty(
    Guid Id,
    string Name,
    RoomAvailabilityRoomPropertyGroup Group)
{
    public static RoomAvailabilityRoomProperty FromRoomProperty(RoomProperty property)
    {
        var mappedGroup = RoomAvailabilityRoomPropertyGroup.FromRoomPropertyGroup(property.Group);
        return new(property.Id, property.Name, mappedGroup);
    }
}

public record RoomAvailabilityRoomPropertyGroup(
    Guid Id,
    string Name)
{
    public static RoomAvailabilityRoomPropertyGroup FromRoomPropertyGroup(RoomPropertyGroup group)
    {
        return new(group.Id, group.Name);
    }
}
