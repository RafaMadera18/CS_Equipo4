using AstraStock.AppHost;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddConfiguredPostgres(builder.Configuration);

var postgresDb = postgres.AddDatabase("AstraStockDb");

if (!builder.Configuration.IsDatabaseMigrationMode())
{
    var apiService = builder.AddProject<Projects.AstraStock_ApiService>("ApiService")
        .WithReference(postgresDb);

    builder.AddNpmAppWithRandomPort("WebApp", "../WebApp")
        .WithEnvironment("SERVER_URL", apiService.GetEndpoint("http"));
}
else
{
    var migrationService = builder.AddProject<Projects.AstraStock_MigrationService>("MigrationService")
        .WithReference(postgresDb)
        .WithEnvironment("db-project", "../Database");

    builder.AddNpmAppWithRandomPort("MigrationClient", "../MigrationService/Client", "dev")
        .WithEnvironment("SERVER_URL", migrationService.GetEndpoint("http"));
}

await builder.Build().RunAsync();
