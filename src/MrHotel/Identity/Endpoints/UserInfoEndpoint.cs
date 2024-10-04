namespace MrHotel.Identity.Endpoints;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.Identity;
using MrHotel.Identity.Data;

using RaptorUtils.AspNet.Identity;

public static class UserInfoEndpoint
{
    public static async Task<Results<Ok<UserInfoResponse>, NotFound>> HandleGet(
        [FromServices] UserContext<AppUser> userContext)
    {
        if (await userContext.TryGetLoggedInUser() is not { } user)
        {
            return TypedResults.NotFound();
        }

        var info = new UserInfoResponse()
        {
            UserName = user.UserName,
        };

        return TypedResults.Ok(info);
    }
}
