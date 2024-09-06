using AstraStock.ApiService;
using AstraStock.Database;
using AstraStock.ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddProblemDetails();

builder.Services.AddDbContext<AppDbContext>(
    options => AppDbContext.Configure(options, builder.Configuration));

var app = builder.Build();

app.UseExceptionHandler();

app.MapGet("/hello", () => "Hello, World!");

app.MapDefaultEndpoints();

await app.InitializeDbAsync<AppDbContext>();

await app.RunAsync();
