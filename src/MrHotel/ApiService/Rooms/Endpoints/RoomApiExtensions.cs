namespace MrHotel.ApiService.Rooms.Endpoints;

using MrHotel.Identity;

public static class RoomApiExtensions
{
    public static IEndpointConventionBuilder MapRoomsApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/rooms").RequireAuthorization(AppPolicy.AdminRole.Name);

        routeGroup.MapGet("/availability", RoomsAvailabilityEndpoint.HandleGet);

        routeGroup.MapPost(string.Empty, RoomEndpoints.HandlePost);

        routeGroup.MapPut("{roomId}", RoomEndpoints.HandlePut);

        routeGroup.MapDelete("{roomId}", RoomEndpoints.HandleDelete);

        return routeGroup.WithTags("Rooms");
    }
}
