namespace AstraStock.ApiService;

using AstraStock.Database;
using AstraStock.ServiceDefaults.Applications;

using Microsoft.AspNetCore.Builder;

public class ApiService : AstraStockWebAppDefinition
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
