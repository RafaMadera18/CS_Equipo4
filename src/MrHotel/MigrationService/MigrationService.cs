namespace MrHotel.MigrationService;

using System.Threading.Tasks;

using MrHotel.ServiceDefaults.Applications;
using MrHotel.Shared.Extensions.Configuration;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SignalR;

internal class MigrationService : MrHotelWebAppDefinition
{
    protected override async Task ConfigureServices(WebApplicationBuilder builder)
    {
        await base.ConfigureServices(builder);

        builder.Services.AddSignalR(options => options.AddFilter<LoggingHubFilter>());

        string project = builder.Configuration.GetRequired("db-project");
        var commandHandler = new EFCommandHandler("--project", project, "--startup-project", project);
        builder.Services.AddSingleton(commandHandler);
    }

    protected override async Task Configure(WebApplication app)
    {
        await base.Configure(app);

        app.MapHub<TerminalHub>("/terminal");
    }
}
