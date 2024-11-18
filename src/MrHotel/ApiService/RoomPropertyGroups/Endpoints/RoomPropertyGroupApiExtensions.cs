namespace MrHotel.ApiService.RoomPropertyGroups.Endpoints;

using MrHotel.Identity;

public static class RoomPropertyGroupApiExtensions
{
    public static IEndpointConventionBuilder MapRoomPropertyGroupApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/room-property-groups").RequireAuthorization(AppPolicy.AdminRole.Name);

        routeGroup.MapPost(string.Empty, RoomPropertyGroupEndpoints.HandlePost);

        routeGroup.MapGet(string.Empty, RoomPropertyGroupEndpoints.HandleGet);

        routeGroup.MapPut("{groupId}", RoomPropertyGroupEndpoints.HandlePut);

        routeGroup.MapDelete("{groupId}", RoomPropertyGroupEndpoints.HandleDelete);

        return routeGroup.WithTags("Room property groups");
    }
}
