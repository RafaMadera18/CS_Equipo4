namespace MrHotel.ApiService;

using FluentValidation;

using Microsoft.AspNetCore.Builder;

using MrHotel.ApiService.Core.Storage.Entities.Extensions;
using MrHotel.ApiService.Guests.Endpoints;
using MrHotel.ApiService.Guests.Services;
using MrHotel.ApiService.Inventory.Endpoints;
using MrHotel.ApiService.Inventory.Services;
using MrHotel.ApiService.Reports.Data;
using MrHotel.ApiService.Reports.Endpoints;
using MrHotel.ApiService.Reports.Services;
using MrHotel.ApiService.Reports.Validation;
using MrHotel.ApiService.Reservations.Endpoints;
using MrHotel.ApiService.Reservations.Services;
using MrHotel.ApiService.RoomPropertyGroups.Endpoints;
using MrHotel.ApiService.RoomPropertyGroups.Services;
using MrHotel.ApiService.Rooms.Endpoints;
using MrHotel.ApiService.Rooms.Services;
using MrHotel.Database;
using MrHotel.Database.Entities;
using MrHotel.Database.Entities.Guests;
using MrHotel.Database.Entities.Inventory;
using MrHotel.Database.Entities.Reports;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;
using MrHotel.Identity.Extensions;
using MrHotel.ServiceDefaults.WebAppSettings;

using YamlDotNet.Serialization;

public class ApiService : MrHotelWebAppDefinition
{
    protected override async Task ConfigureServices(WebApplicationBuilder builder)
    {
        await base.ConfigureServices(builder);

        ValidatorOptions.Global.LanguageManager.Enabled = false;

        builder.Services.AddProblemDetails();

        builder.Services.AddAppDbContext(builder.Configuration);

        builder.Services.AddAppIdentity<AppDbContext, AppUser>(builder.Configuration);

        builder.Services.AddAppAuth();

        builder.Services.AddTransient<RoomManager>();
        builder.Services.AddTransient<RoomPropertyGroupManager>();
        builder.Services.AddTransient<RoomAvailabilityManager>();
        builder.Services.AddTransient<GuestManager>();
        builder.Services.AddTransient<ReservationManager>();
        builder.Services.AddTransient<InventoryManager>();
        builder.Services.AddTransient<ReportManager<UsageReport>>();
        builder.Services.AddTransient<ReportManager<PurchaseReport>>();

        builder.Services.AddEntityRepository<AppDbContext, RoomInfo>();
        builder.Services.AddEntityRepository<AppDbContext, RoomPropertyGroup>();
        builder.Services.AddEntityRepository<AppDbContext, GuestInfo>();
        builder.Services.AddEntityRepository<AppDbContext, ReservationInfo>();
        builder.Services.AddEntityRepository<AppDbContext, ProductStock>();
        builder.Services.AddEntityRepository<AppDbContext, UsageReport>();
        builder.Services.AddEntityRepository<AppDbContext, PurchaseReport>();
    }

    protected override async Task Configure(WebApplication app)
    {
        await base.Configure(app);

        app.UseExceptionHandler();

        var apiGroup = app.MapGroup("/api");

        apiGroup.MapMrHotelIdentityApi<AppUser>();

        apiGroup.MapRoomsApi();

        apiGroup.MapRoomPropertyGroupApi();

        apiGroup.MapGuestApi();

        apiGroup.MapReservationApi();

        apiGroup.MapInventoryApi();

        apiGroup.MapReportApi();

        await app.InitializeDb();
    }
}
