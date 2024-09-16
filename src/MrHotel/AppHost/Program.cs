using MrHotel.AppHost;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddConfiguredPostgres(builder.Configuration);

var postgresDb = postgres.AddDatabase("MrHotelDb");

if (!builder.Configuration.IsDatabaseMigrationMode())
{
    var apiService = builder.AddProject<Projects.MrHotel_ApiService>("ApiService")
        .WithReference(postgresDb);

    builder.AddNpmAppWithRandomPort("WebApp", "../WebApp")
        .WithEnvironment("SERVER_URL", apiService.GetEndpoint("http"));
}
else
{
    var migrationService = builder.AddProject<Projects.MrHotel_MigrationService>("MigrationService")
        .WithReference(postgresDb)
        .WithEnvironment("db-project", "../Database");

    builder.AddNpmAppWithRandomPort("MigrationClient", "../MigrationService/Client", "dev")
        .WithEnvironment("SERVER_URL", migrationService.GetEndpoint("http"));
}

await builder.Build().RunAsync();
