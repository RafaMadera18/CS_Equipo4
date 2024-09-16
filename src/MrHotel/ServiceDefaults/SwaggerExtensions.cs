namespace MrHotel.ServiceDefaults;

using System.Diagnostics.Contracts;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using MrHotel.Shared.Extensions.Configuration;

using SwaggerThemes;

internal static class SwaggerExtensions
{
    public static void AddSwaggerGenIfEnabled(this WebApplicationBuilder builder)
    {
        if (IsSwaggerEnabled(builder.Environment, builder.Configuration))
        {
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(options
                => options.SupportNonNullableReferenceTypes());
        }
    }

    public static void UseSwaggerIfEnabled(this WebApplication app)
    {
        if (IsSwaggerEnabled(app.Environment, app.Configuration))
        {
            app.UseSwagger();
            app.UseSwaggerThemes(Theme.UniversalDark);
            app.UseSwaggerUI();
            app.Logger.LogInformation("Swagger enabled");
        }
    }

    [Pure]
    public static bool IsSwaggerEnabled(IWebHostEnvironment environment, IConfiguration configuration)
    {
        return configuration.IsEnabled("ENABLE_SWAGGER", environment.IsDevelopment());
    }
}
