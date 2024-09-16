namespace MrHotel.Identity.Services;

using Microsoft.AspNetCore.Identity;

using MrHotel.Identity.Data;

public class UserRegisterService(
    UserManager<AppUser> userManager,
    AdminCodeValidator adminCodeValidator)
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
        var user = new AppUser()
        {
            UserName = request.UserName,
            Role = role,
        };

        return await userManager.CreateAsync(user, request.Password);
    }
}
