var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.AstraStock_ApiService>("ApiService");

builder.AddNpmApp("WebApp", "../WebApp")
    .WithHttpEndpoint(targetPort: 4200);

await builder.Build().RunAsync();
