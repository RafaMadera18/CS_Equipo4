namespace MrHotel.ApiService.Rooms.Endpoints;

public static class RoomApiExtensions
{
    public static IEndpointConventionBuilder MapRoomsApi(
        this IEndpointRouteBuilder endpoints, string tag = "Rooms")
    {
        ArgumentNullException.ThrowIfNull(endpoints);
        ArgumentException.ThrowIfNullOrWhiteSpace(tag);

        var routeGroup = endpoints.MapGroup(string.Empty).RequireAuthorization();

        routeGroup.MapGet("/room-statuses", RoomStatusEndpoint.HandleGet);

        routeGroup.MapPost("/rooms", RoomEndpoint.HandlePost);

        routeGroup.MapDelete("/rooms", RoomEndpoint.HandleDelete);

        return routeGroup.WithTags(tag);
    }
}
