using MrHotel.AppHost;

using RaptorUtils.Aspire.Hosting.NodeJs;

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
    var migrationServer = builder.AddProject<Projects.EFMigrationService_Server>("MigrationServer")
        .WithReference(postgresDb)
        .WithEnvironment("--project", "../Database")
        .WithEnvironment("--startup-project", "../Database");

    builder.AddNpmApp("MigrationClient", "../../EFMigrationService/Client", "dev")
        .WithEnvironment("SERVER_URL", migrationServer.GetEndpoint("http"))
        .WithRandomPort();
}

await builder.Build().RunAsync();
