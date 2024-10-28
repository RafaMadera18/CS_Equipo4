﻿namespace MrHotel.ApiService.Rooms.Endpoints;

using MrHotel.Identity;

public static class RoomApiExtensions
{
    public static IEndpointConventionBuilder MapRoomsApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/rooms").RequireAuthorization(AppPolicy.AdminRole.Name);

        routeGroup.MapGet("/statuses", RoomStatusEndpoint.HandleGet);

        routeGroup.MapPost(string.Empty, RoomEndpoint.HandlePost);

        routeGroup.MapPut("{roomId}", RoomEndpoint.HandlePut);

        routeGroup.MapDelete("{roomId}", RoomEndpoint.HandleDelete);

        return routeGroup.WithTags("Rooms");
    }
}
