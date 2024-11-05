namespace MrHotel.Database;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using RaptorUtils.Extensions.Configuration;

public static class AppDbContextConfiguration
{
    public static void Configure(DbContextOptionsBuilder options, IConfiguration configuration)
    {
        string connectionString = configuration.GetRequiredConnectionString("MrHotelDb");

        Configure(options, connectionString);
    }

    public static void Configure(DbContextOptionsBuilder options, string connectionString)
    {
        ArgumentNullException.ThrowIfNull(connectionString);

        options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);

        options.UseNpgsql(
            connectionString,
            options => options.EnableRetryOnFailure(3, TimeSpan.FromSeconds(5), null));
    }
}
