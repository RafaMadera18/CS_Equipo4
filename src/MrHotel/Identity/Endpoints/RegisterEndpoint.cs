namespace MrHotel.Identity.Endpoints;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using MrHotel.Identity.Data;
using MrHotel.Identity.Services;

public static class RegisterEndpoint
{
    public static async Task<Results<Ok, ValidationProblem>> Handle(
        [FromBody] RegisterRequest request,
        [FromServices] UserRegisterService userRegisterService)
    {
        IdentityResult result = await userRegisterService.RegisterUserAsync(request);

        if (!result.Succeeded)
        {
            return IdentityValidationHelper.CreateValidationProblem(result);
        }

        return TypedResults.Ok();
    }
}
