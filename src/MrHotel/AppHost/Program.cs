using EFMigrationService.Integration;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using MrHotel.AppHost;

using RaptorUtils.Aspire.Hosting.NodeJs;
using RaptorUtils.Extensions.Configuration;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddConfiguredPostgres(builder.Configuration);

var mrHotelDb = postgres.AddDatabase("MrHotelDb");

if (!builder.Configuration.IsDatabaseMigrationMode())
{
    var apiService = builder.AddProject<Projects.MrHotel_ApiService>("ApiService")
        .WithReference(mrHotelDb);

    builder.AddNpmApp("WebApp", "../WebApp")
        .WithEnvironment("SERVER_URL", apiService.GetEndpoint("http"))
        .WithRandomPort();
}
else
{
    using var serviceProvider = builder.Services.BuildServiceProvider();

    var logger = serviceProvider.GetRequiredService<ILoggerFactory>().CreateLogger<MigrationService>();

    string efToolVersion = builder.Configuration.GetRequired("EFToolVersion");

    var migrationService = new MigrationService(logger, "../../EFMigrationService", efToolVersion);

    await migrationService.Initialize();

    string migrationTargetProject = Path.GetFullPath("../Database");

    var migrationServer = builder.AddProject<Projects.EFMigrationService_Server>("MigrationServer")
        .WithReference(mrHotelDb)
        .WithSingleMigrationProject(migrationTargetProject);

    builder.AddMigrationClient(migrationServer.GetEndpoint("http"), migrationService.ClientPath);
}

await builder.Build().RunAsync();
