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

        routeGroup.MapGet("/admin-register-status", AdminRegisterStatusEndpoint.Handle);

        routeGroup.MapPost("/login", LoginEndpoint.Handle);

        routeGroup.MapPost("/logout", LogoutEndpoint.Handle).RequireAuthorization();

        var accountGroup = routeGroup.MapGroup("/manage").RequireAuthorization();

        accountGroup.MapGet("/info", UserInfoEndpoint.HandleGet).RequireAuthorization();

        return routeGroup.WithTags(tag);
    }
}
