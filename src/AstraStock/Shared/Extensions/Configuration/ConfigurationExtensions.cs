namespace AstraStock.Shared.Extensions.Configuration;

using Microsoft.Extensions.Configuration;

public static class ConfigurationExtensions
{
    public static bool IsEnabled(this IConfiguration configuration, string key)
    {
        ArgumentNullException.ThrowIfNull(configuration);
        ArgumentNullException.ThrowIfNull(key);

        string? value = configuration[key.Trim()];

        return value is "1"
            || string.Equals(value, "true", StringComparison.InvariantCultureIgnoreCase);
    }

    public static string GetRequired(this IConfiguration configuration, string key)
    {
        ArgumentNullException.ThrowIfNull(configuration);
        ArgumentNullException.ThrowIfNull(key);

        return configuration[key]
            ?? throw new InvalidOperationException($"Required key '{key}' not found.");
    }

    public static string GetRequiredConnectionString(this IConfiguration configuration, string name)
    {
        ArgumentNullException.ThrowIfNull(configuration);
        ArgumentNullException.ThrowIfNull(name);

        return configuration.GetConnectionString(name)
            ?? throw new InvalidOperationException($"Required connection string '{name}' not found.");
    }
}
