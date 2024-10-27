namespace MrHotel.Identity.Services;

using Microsoft.AspNetCore.Identity;

using MrHotel.Identity.Data;

public class UserRegisterService<TUser>(
    UserManager<TUser> userManager,
    AdminCodeValidator adminCodeValidator)
    where TUser : AppIdentityUser, new()
{
    public Task<IdentityResult> RegisterUserAsync(RegisterRequest request)
    {
        return this.RegisterAsync(request, UserRole.User);
    }

    public async Task<IdentityResult> RegisterAdminAsync(AdminRegisterRequest request)
    {
        if (!adminCodeValidator.IsValid(request.AdminCode))
        {
            var error = new IdentityError
            {
                Code = "InvalidAdminCode",
                Description = "Invalid admin code",
            };

            return IdentityResult.Failed(error);
        }

        return await this.RegisterAsync(request, UserRole.Admin);
    }

    private async Task<IdentityResult> RegisterAsync(RegisterRequest request, UserRole role)
    {
        var user = new TUser()
        {
            UserName = request.UserName,
        };

        IdentityResult result = await userManager.CreateAsync(user, request.Password);

        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, role.ToString());
        }

        return result;
    }
}
