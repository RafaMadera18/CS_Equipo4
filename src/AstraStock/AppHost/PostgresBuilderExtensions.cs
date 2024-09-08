namespace AstraStock.AppHost;

using Microsoft.Extensions.Configuration;

public static class PostgresBuilderExtensions
{
    public static IResourceBuilder<PostgresServerResource> AddConfiguredPostgres(
        this IDistributedApplicationBuilder builder,
        IConfiguration configuration)
    {
        var postgres = builder.AddPostgres("Postgres")
            .WithPgAdmin()
            .WithPgWeb();

        if (configuration.IsDatabasePersistenceEnabled())
        {
            return postgres.WithDataVolume();
        }

        return postgres;
    }
}
