namespace MrHotel.ApiService;

using MrHotel.Database;
using MrHotel.ServiceDefaults.Applications;

using Microsoft.AspNetCore.Builder;

public class ApiService : MrHotelWebAppDefinition
{
    protected override async Task ConfigureServices(WebApplicationBuilder builder)
    {
        await base.ConfigureServices(builder);

        builder.Services.AddProblemDetails();

        builder.Services.AddAppDbContext(builder.Configuration);
    }

    protected override async Task Configure(WebApplication app)
    {
        await base.Configure(app);

        app.UseExceptionHandler();

        app.MapGet("/hello", () => "Hello, World!");

        await app.InitializeDbAsync();
    }
}
