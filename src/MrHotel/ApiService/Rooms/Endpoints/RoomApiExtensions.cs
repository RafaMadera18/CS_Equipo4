namespace MrHotel.ApiService.Rooms.Endpoints;

public static class RoomApiExtensions
{
    public static IEndpointConventionBuilder MapRoomsApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/rooms").RequireAuthorization();

        routeGroup.MapGet("/statuses", RoomStatusEndpoint.HandleGet);

        routeGroup.MapPost(string.Empty, RoomEndpoint.HandlePost);

        routeGroup.MapDelete(string.Empty, RoomEndpoint.HandleDelete);

        return routeGroup.WithTags("Rooms");
    }
}
