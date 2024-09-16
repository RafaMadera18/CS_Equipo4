namespace MrHotel.Identity.Extensions;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;

using MrHotel.Identity.Services;

public static class MrHotelIdentityBuilderExtensions
{
    public static IdentityBuilder AddMrHotelApiEndpoints(this IdentityBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

        builder.Services.TryAddTransient<UserRegisterService>();
        builder.Services.TryAddTransient<AdminCodeValidator>();

        return builder;
    }
}
