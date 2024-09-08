namespace AstraStock.ServiceDefaults.Applications;

using System;

using Microsoft.AspNetCore.Builder;

using Serilog;
using Serilog.Sinks.SystemConsole.Themes;

public abstract class AstraStockWebAppDefinition : SerilogWebAppDefinition
{
    public override ConsoleTheme? ConsoleTheme => AnsiConsoleTheme.Code;

    protected override Action<IServiceProvider, LoggerConfiguration> ConfigureLogger(WebApplicationBuilder builder)
    {
        return (_, options)
            => options
            .ReadFrom.Configuration(builder.Configuration)
            .Enrich.FromLogContext()
            .WriteTo.Console(theme: this.ConsoleTheme, applyThemeToRedirectedOutput: true)
            .WriteTo.OpenTelemetry();
    }

    protected override async Task ConfigureServices(WebApplicationBuilder builder)
    {
        await base.ConfigureServices(builder);

        builder.AddServiceDefaults();

        builder.AddSwaggerGenIfEnabled();
    }

    protected override async Task Configure(WebApplication app)
    {
        await base.Configure(app);

        app.MapDefaultEndpoints();

        app.UseSwaggerIfEnabled();
    }
}
