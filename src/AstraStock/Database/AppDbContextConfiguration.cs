﻿namespace AstraStock.Database;

using AstraStock.Shared.Extensions.Configuration;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public static class AppDbContextConfiguration
{
    public static void Configure(DbContextOptionsBuilder options, IConfiguration configuration)
    {
        string connectionString = configuration.GetRequiredConnectionString("AstraStockDb");

        Configure(options, connectionString);
    }

    public static void Configure(DbContextOptionsBuilder options, string connectionString)
    {
        ArgumentNullException.ThrowIfNull(connectionString);

        options.UseNpgsql(
            connectionString,
            options => options.EnableRetryOnFailure(3, TimeSpan.FromSeconds(5), null));
    }
}
