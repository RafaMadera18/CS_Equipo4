namespace MrHotel.ApiService.Reservations.Endpoints;

public static class ReservationApiExtensions
{
    public static IEndpointConventionBuilder MapReservationApi(
        this IEndpointRouteBuilder endpoints, string tag = "Reservations")
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
