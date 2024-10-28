﻿namespace MrHotel.ApiService.Guests.Endpoints;

public static class GuestApiExtensions
{
    public static IEndpointConventionBuilder MapGuestApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/guests").RequireAuthorization();

        routeGroup.MapPost(string.Empty, GuestEndpoints.HandlePost);

        return routeGroup.WithTags("Guests");
    }
}
