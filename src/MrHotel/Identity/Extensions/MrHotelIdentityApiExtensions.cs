namespace MrHotel.Identity.Extensions;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

using MrHotel.Identity.Endpoints;

public static class MrHotelIdentityApiExtensions
{
    public static IEndpointConventionBuilder MapMrHotelIdentityApi(
        this IEndpointRouteBuilder endpoints, string tag = "Account")
    {
        ArgumentNullException.ThrowIfNull(endpoints);
        ArgumentException.ThrowIfNullOrWhiteSpace(tag);

        var routeGroup = endpoints.MapGroup(string.Empty);

        routeGroup.MapPost("/register-admin", RegisterAdminEndpoint.Handle);

        routeGroup.MapPost("/register", RegisterEndpoint.Handle).RequireAuthorization();

        routeGroup.MapPost("/login", LoginEndpoint.Handle);

        routeGroup.MapPost("/logout", LogoutEndpoint.Handle).RequireAuthorization();

        return routeGroup.WithTags(tag);
    }
}
