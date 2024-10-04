namespace MrHotel.Identity.Extensions;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;

using MrHotel.Identity.Services;

public static class MrHotelIdentityBuilderExtensions
{
    public static IdentityBuilder AddMrHotelApiEndpoints<TUser>(this IdentityBuilder builder)
        where TUser : AppIdentityUser, new()
    {
        ArgumentNullException.ThrowIfNull(builder);

        builder.Services.TryAddTransient<UserRegisterService<TUser>>();
        builder.Services.TryAddTransient<AdminCodeValidator>();

        return builder;
    }
}
