using AstraStock.AppHost;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddConfiguredPostgres(builder.Configuration);

var postgresDb = postgres.AddDatabase("AstraStockDb");

if (!builder.Configuration.IsDatabaseMigrationMode())
{
    builder.AddProject<Projects.AstraStock_ApiService>("ApiService")
        .WithReference(postgresDb);

    builder.AddNpmApp("WebApp", "../WebApp")
        .WithHttpEndpoint(targetPort: 4200);
}
else
{
    var migrationService = builder.AddProject<Projects.AstraStock_MigrationService>("MigrationService")
        .WithReference(postgresDb)
        .WithEnvironment("db-project", "../Database");

    builder.AddNpmApp("MigrationClient", "../MigrationService/Client", "dev")
        .WithEnvironment("SERVER_URL", migrationService.GetEndpoint("http"))
        .WithHttpEndpoint(targetPort: 5173);
}

await builder.Build().RunAsync();
