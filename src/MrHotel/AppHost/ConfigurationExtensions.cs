namespace MrHotel.AppHost;

using Microsoft.Extensions.Configuration;

using MrHotel.Shared.Extensions.Configuration;

internal static class ConfigurationExtensions
{
    public static bool IsDatabasePersistenceEnabled(this IConfiguration configuration)
    {
        return configuration.IsEnabled("DB_PERSISTENCE")
            || configuration.IsDatabaseMigrationMode();
    }

    public static bool IsDatabaseMigrationMode(this IConfiguration configuration)
    {
        return configuration.IsEnabled("DB_MIGRATION");
    }
}
