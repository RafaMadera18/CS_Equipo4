namespace MrHotel.ServiceDefaults.Applications;

using System;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Serilog;
using Serilog.Sinks.SystemConsole.Themes;

public abstract class MrHotelWebAppDefinition : SerilogWebAppDefinition
{
    public override ConsoleTheme? ConsoleTheme => AnsiConsoleTheme.Code;

    protected override void ConfigureLogger(IServiceProvider serviceProvider, LoggerConfiguration options)
    {
        var configuration = serviceProvider.GetRequiredService<IConfiguration>();

        options
            .ReadFrom.Configuration(configuration)
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
