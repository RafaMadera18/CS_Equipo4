namespace AstraStock.AppHost;

using AstraStock.Shared.Extensions.Configuration;

using Microsoft.Extensions.Configuration;

public static class ConfigurationExtensions
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
