namespace MrHotel.ApiService;

using Microsoft.EntityFrameworkCore;

using MrHotel.Database;

using RaptorUtils.Extensions.Configuration;

internal static class DatabaseInitializer
{
    public static async Task InitializeDbAsync(this WebApplication app)
    {
        if (app.Configuration.IsEnabled("DB_PERSISTENCE"))
        {
            return;
        }

        if (app.Environment.IsProduction())
        {
            throw new InvalidOperationException("DB_PERSISTENCE is required in production mode");
        }

        app.Logger.LogWarning("Db persistence disabled! Data will not be saved.");

        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await dbContext.Database.EnsureCreatedAsync();

        string dbName = dbContext.Database.GetDbConnection().Database;
        app.Logger.LogInformation("Database '{Name}' created successfully", dbName);
    }
}
