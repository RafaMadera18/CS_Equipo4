using EFMigrationService.Integration;

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
    string migrationTargetProject = Path.GetFullPath("../Database");

    var migrationServer = builder.AddProject<Projects.EFMigrationService_Server>("MigrationServer")
        .WithReference(postgresDb)
        .WithSingleMigrationProject(migrationTargetProject);

    builder.AddMigrationClient(migrationServer, "../../EFMigrationService/Client");
}

await builder.Build().RunAsync();