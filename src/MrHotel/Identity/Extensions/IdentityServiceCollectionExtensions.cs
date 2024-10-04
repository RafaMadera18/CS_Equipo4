namespace MrHotel.Identity.Extensions;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MrHotel.Identity;

public static class IdentityServiceCollectionExtensions
{
    public static void AddAppIdentity<TDbContext>(
        this IServiceCollection services,
        IConfiguration configuration)
        where TDbContext : IdentityDbContext<AppUser>
    {
        int passwordMinLength = configuration.GetRequiredSection("PasswordMinLength").Get<int>();

        services.AddIdentityCore<AppUser>(options =>
        {
            options.Password.RequiredLength = passwordMinLength;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireDigit = false;
        })
        .AddEntityFrameworkStores<TDbContext>()
        .AddUserManager<UserManager<AppUser>>()
        .AddSignInManager<SignInManager<AppUser>>()
        .AddMrHotelApiEndpoints();
    }
}
