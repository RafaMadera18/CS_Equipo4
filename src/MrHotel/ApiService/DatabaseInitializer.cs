namespace MrHotel.ApiService;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using MrHotel.Database;
using MrHotel.Identity;

using RaptorUtils.AspNet.Logging;
using RaptorUtils.Extensions.Configuration;

internal static class DatabaseInitializer
{
    public static async Task InitializeDb(this WebApplication app)
    {
        using IServiceScope serviceScope = app.Services.CreateScope();
        IServiceProvider serviceProvider = serviceScope.ServiceProvider;

        await EnsureDbCreated(app, serviceProvider);
        await EnsureRolesCreated(app.Logger, serviceProvider);
    }

    private static async Task EnsureDbCreated(WebApplication app, IServiceProvider serviceProvider)
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

        var dbContext = serviceProvider.GetRequiredService<AppDbContext>();

        bool dbCreated = await dbContext.Database.EnsureCreatedAsync();

        if (!dbCreated)
        {
            throw new InvalidOperationException("Database already exists.");
        }

        string dbName = dbContext.Database.GetDbConnection().Database;
        app.Logger.LogInformation("Database '{DatabaseName}' created successfully", dbName);
    }

    private static async Task EnsureRolesCreated(ILogger logger, IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        foreach (string roleName in Enum.GetNames<UserRole>())
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var role = new IdentityRole(roleName);
                await roleManager.CreateAsync(role);

                logger.TryInformation()?.Log("Created role: {Role}", roleName);
            }
        }
    }
}
