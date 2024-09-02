var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();

app.MapGet("/hello", () => "Hello, World!");

app.MapDefaultEndpoints();

await app.RunAsync();
