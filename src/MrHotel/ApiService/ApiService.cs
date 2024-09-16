namespace MrHotel.ApiService;

using Microsoft.AspNetCore.Builder;

using MrHotel.Database;
using MrHotel.Identity.Extensions;
using MrHotel.ServiceDefaults.Applications;

public class ApiService : MrHotelWebAppDefinition
{
    protected override async Task ConfigureServices(WebApplicationBuilder builder)
    {
        await base.ConfigureServices(builder);

        builder.Services.AddProblemDetails();

        builder.Services.AddAppDbContext(builder.Configuration);

        builder.Services.AddAppIdentity<AppDbContext>();

        builder.Services.AddAppAuth();
    }

    protected override async Task Configure(WebApplication app)
    {
        await base.Configure(app);

        app.UseExceptionHandler();

        var apiGroup = app.MapGroup("/api");

        apiGroup.MapGroup("/account").MapMrHotelIdentityApi();

        await app.InitializeDbAsync();
    }
}
