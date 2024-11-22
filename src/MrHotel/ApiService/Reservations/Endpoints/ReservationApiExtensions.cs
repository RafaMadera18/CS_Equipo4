namespace MrHotel.ApiService.Reservations.Endpoints;

using MrHotel.Identity;

public static class ReservationApiExtensions
{
    public static IEndpointConventionBuilder MapReservationApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/reservations")
            .RequireAuthorization(AppPolicy.AdminRole.Name);

        routeGroup.MapPost(string.Empty, ReservationEndpoint.HandlePost);

        routeGroup.MapPut("{reservationId}/checkout", ReservationEndpoint.HandleCheckout);

        return routeGroup.WithTags("Reservations");
    }
}
