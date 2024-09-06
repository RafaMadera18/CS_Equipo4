namespace AstraStock.ApiService;

using AstraStock.Shared.Extensions.Configuration;

using Microsoft.EntityFrameworkCore;

internal static class DatabaseInitializer
{
    public static async Task InitializeDbAsync<TDbContext>(this WebApplication app)
        where TDbContext : DbContext
    {
        if (app.Configuration.IsEnabled("DB_PERSISTENCE"))
        {
            return;
        }

        app.Logger.LogWarning("Db persistence disabled! Data will not be saved.");

        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TDbContext>();
        await context.Database.EnsureCreatedAsync();
    }
}
