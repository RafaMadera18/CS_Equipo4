namespace MrHotel.ApiService;

using Microsoft.AspNetCore.Builder;

using MrHotel.ApiService.Reservations.Endpoints;
using MrHotel.ApiService.Reservations.Services;
using MrHotel.Database;
using MrHotel.Database.Entities;
using MrHotel.Identity.Extensions;
using MrHotel.ServiceDefaults.WebAppSettings;

public class ApiService : MrHotelWebAppDefinition
{
    protected override async Task ConfigureServices(WebApplicationBuilder builder)
    {
        await base.ConfigureServices(builder);

        builder.Services.AddProblemDetails();

        builder.Services.AddAppDbContext(builder.Configuration);

        builder.Services.AddAppIdentity<AppDbContext, AppUser>(builder.Configuration);

        builder.Services.AddAppAuth();

        builder.Services.AddTransient<RoomManager>();
    }

    protected override async Task Configure(WebApplication app)
    {
        await base.Configure(app);

        app.UseExceptionHandler();

        var apiGroup = app.MapGroup("/api");

        apiGroup.MapGroup("/account").MapMrHotelIdentityApi<AppUser>();

        apiGroup.MapGroup("/reservations").MapReservationApi();

        await app.InitializeDbAsync();
    }
}
