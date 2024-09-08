namespace AstraStock.ApiService;

using AstraStock.Database;
using AstraStock.Shared.Extensions.Configuration;

using Microsoft.EntityFrameworkCore;

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
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await Task.Delay(TimeSpan.FromSeconds(2));

        bool dbCreated = await AppDbContextInitializer.EnsureCreatedAsync(
            context,
            exception => app.Logger.LogInformation(exception, "Waiting for database..."));

        if (!dbCreated)
        {
            throw new TimeoutException("Could not create database.");
        }

        string dbName = context.Database.GetDbConnection().Database;
        app.Logger.LogInformation("Database '{Name}' created successfully", dbName);
    }
}
