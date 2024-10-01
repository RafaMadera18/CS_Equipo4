using EFMigrationService.Integration;

using MrHotel.AppHost;

using RaptorUtils.Aspire.Hosting.NodeJs;
using RaptorUtils.Extensions.Configuration;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddConfiguredPostgres(builder.Configuration);

var postgresDb = postgres.AddDatabase("MrHotelDb");

if (!builder.Configuration.IsDatabaseMigrationMode())
{
    var apiService = builder.AddProject<Projects.MrHotel_ApiService>("ApiService")
        .WithReference(postgresDb);

    builder.AddNpmApp("WebApp", "../WebApp")
        .WithEnvironment("SERVER_URL", apiService.GetEndpoint("http"))
        .WithRandomPort();
}
else
{
    string migrationTargetProject = Path.GetFullPath(builder.Configuration.GetRequired("MigrationTargetProject"));

    var migrationServer = builder.AddProject<Projects.EFMigrationService_Server>("MigrationServer")
        .WithReference(postgresDb)
        .WithSingleMigrationProject(migrationTargetProject);

    builder.AddNpmApp("MigrationClient", "../../EFMigrationService/Client", "dev")
        .WithEnvironment("SERVER_URL", migrationServer.GetEndpoint("http"))
        .WithRandomPort();
}

await builder.Build().RunAsync();
