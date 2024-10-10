namespace MrHotel.Identity.Extensions;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

using MrHotel.Identity.Endpoints;

public static class MrHotelIdentityApiExtensions
{
    public static IEndpointConventionBuilder MapMrHotelIdentityApi<TUser>(
        this IEndpointRouteBuilder endpoints)
        where TUser : AppIdentityUser, new()
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/account");

        routeGroup.MapPost("/register-admin", RegisterAdminEndpoint.Handle<TUser>);

        routeGroup.MapPost("/register", RegisterEndpoint.Handle<TUser>).RequireAuthorization();

        routeGroup.MapGet("/admin-register-status", AdminRegisterStatusEndpoint.Handle<TUser>);

        routeGroup.MapPost("/login", LoginEndpoint.Handle<TUser>);

        routeGroup.MapPost("/logout", LogoutEndpoint.Handle<TUser>).RequireAuthorization();

        var accountGroup = routeGroup.MapGroup("/manage").RequireAuthorization();

        accountGroup.MapGet("/info", UserInfoEndpoint.HandleGet<TUser>).RequireAuthorization();

        return routeGroup.WithTags("Account");
    }
}
