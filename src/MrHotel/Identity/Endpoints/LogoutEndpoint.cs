namespace MrHotel.Identity.Endpoints;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public static class LogoutEndpoint
{
    public static Task Handle(
        [FromServices] SignInManager<IdentityUser> signInManager)
    {
        return signInManager.SignOutAsync();
    }
}
