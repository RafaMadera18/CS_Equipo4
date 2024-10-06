namespace MrHotel.Identity.Endpoints;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using MrHotel.Identity.Data;

public static class LoginEndpoint
{
    public static async Task<Results<Ok, ProblemHttpResult>> Handle<TUser>(
        [FromBody] LoginRequest request,
        [FromServices] SignInManager<TUser> signInManager)
        where TUser : AppIdentityUser
    {
        var result = await signInManager.PasswordSignInAsync(
            request.UserName,
            request.Password,
            isPersistent: true,
            lockoutOnFailure: true);

        if (!result.Succeeded)
        {
            return TypedResults.Problem(result.ToString(), statusCode: StatusCodes.Status401Unauthorized);
        }

        return TypedResults.Ok();
    }
}
