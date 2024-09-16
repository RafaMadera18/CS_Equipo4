namespace MrHotel.ServiceDefaults.Applications;

using Microsoft.AspNetCore.Builder;

using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

public abstract class SerilogWebAppDefinition : WebAppDefinition
{
    public virtual ConsoleTheme? ConsoleTheme { get; }

    protected override Task OnRun(string[] args)
    {
        Log.Logger = this.CreateBootstrapLogger();

        Log.Information("Starting web application");

        return base.OnRun(args);
    }

    protected override Task<int?> OnException(Exception exception)
    {
        Log.Fatal(exception, "Application terminated unexpectedly");
        return Task.FromResult<int?>(1);
    }

    protected override async Task OnFinally()
    {
        Log.Information("Flushing logs...");
        await Log.CloseAndFlushAsync();
    }

    protected virtual ILogger CreateBootstrapLogger()
    {
        return new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console(theme: this.ConsoleTheme, applyThemeToRedirectedOutput: true)
            .CreateBootstrapLogger();
    }

    protected abstract void ConfigureLogger(IServiceProvider serviceProvider, LoggerConfiguration options);

    protected override WebApplicationBuilder CreateBuilder(string[] args)
    {
        var builder = base.CreateBuilder(args);

        Log.Information("Environment: {Environment}", builder.Environment.EnvironmentName);

        builder.Services.AddSerilog(this.ConfigureLogger);

        return builder;
    }

    protected override Task ConfigureServices(WebApplicationBuilder builder)
    {
        Log.Information("Configuring services");
        return Task.CompletedTask;
    }

    protected override Task AfterConfigureServices(WebApplicationBuilder builder)
    {
        Log.Information("Total services: {Count}", builder.Services.Count);
        return Task.CompletedTask;
    }

    protected override Task Configure(WebApplication app)
    {
        Log.Information("Configuring app");
        return Task.CompletedTask;
    }

    protected override Task AfterConfigure(WebApplication app)
    {
        Log.Information("Starting app");
        return Task.CompletedTask;
    }
}
