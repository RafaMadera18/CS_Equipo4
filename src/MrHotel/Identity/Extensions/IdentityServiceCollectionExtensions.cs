﻿namespace MrHotel.Identity.Extensions;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using MrHotel.Identity;

using RaptorUtils.AspNet.Identity;

public static class IdentityServiceCollectionExtensions
{
    public static void AddAppIdentity<TDbContext, TUser>(
        this IServiceCollection services,
        IConfiguration configuration)
        where TDbContext : IdentityDbContext<TUser>
        where TUser : AppIdentityUser, new()
    {
        int passwordMinLength = configuration.GetRequiredSection("PasswordMinLength").Get<int>();

        services.AddIdentityCore<TUser>(options =>
        {
            options.Password.RequiredLength = passwordMinLength;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireDigit = false;
        })
        .AddEntityFrameworkStores<TDbContext>()
        .AddUserManager<UserManager<TUser>>()
        .AddSignInManager<SignInManager<TUser>>()
        .AddMrHotelApiEndpoints<TUser>();

        services.AddScoped<UserContext<TUser>>();
    }
}
