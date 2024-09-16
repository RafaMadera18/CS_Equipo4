namespace MrHotel.Identity.Extensions;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using MrHotel.Identity;

public static class IdentityServiceCollectionExtensions
{
    public static void AddAppIdentity<TDbContext>(this IServiceCollection services)
        where TDbContext : IdentityDbContext<AppUser>
    {
        services.AddIdentityCore<AppUser>(options => options.Password.RequiredLength = 10)
            .AddEntityFrameworkStores<TDbContext>()
            .AddUserManager<UserManager<AppUser>>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddMrHotelApiEndpoints();
    }
}
