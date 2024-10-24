﻿namespace MrHotel.ApiService.Reservations.Endpoints;

public static class ReservationApiExtensions
{
    public static IEndpointConventionBuilder MapReservationApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("reservations").RequireAuthorization();

        routeGroup.MapPost(string.Empty, ReservationEndpoint.HandlePost);

        return routeGroup.WithTags("Reservations");
    }
}
