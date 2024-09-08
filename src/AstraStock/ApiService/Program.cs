using AstraStock.ApiService;
using AstraStock.Database;
using AstraStock.ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddProblemDetails();

builder.Services.AddAppDbContext(builder.Configuration);

var app = builder.Build();

app.UseExceptionHandler();

app.MapGet("/hello", () => "Hello, World!");

app.MapDefaultEndpoints();

await app.InitializeDbAsync();

await app.RunAsync();
