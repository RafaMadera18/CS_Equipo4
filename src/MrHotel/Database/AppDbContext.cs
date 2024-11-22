namespace MrHotel.Database;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using MrHotel.Database.Entities;
using MrHotel.Database.Entities.Guests;
using MrHotel.Database.Entities.Inventory;
using MrHotel.Database.Entities.Reports;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;
using MrHotel.Identity;

using RaptorUtils.AspNet.Identity;

public class AppDbContext(
    DbContextOptions<AppDbContext> options)
    : IdentityDbContext<AppUser>(options)
{
    public DbSet<RoomInfo> Rooms { get; init; } = null!;

    public DbSet<GuestInfo> Guests { get; init; } = null!;

    public DbSet<ReservationInfo> Reservations { get; init; } = null!;

    public DbSet<ProductStock> Stocks { get; init; } = null!;

    public DbSet<UsageReport> UsageReports { get; init; } = null!;

    public DbSet<PurchaseReport> PurchaseReports { get; init; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<RoomProperty>()
            .HasMany(e => e.Rooms)
            .WithMany(e => e.Properties);

        SeedRoles(builder);
    }

    private static void SeedRoles(ModelBuilder builder)
    {
        var appNamespace = new Guid("7ae99286-1389-4ac9-826a-63a2dd9df25a");
        var roleGenerator = new IdentityRoleGenerator(appNamespace);

        IEnumerable<IdentityRole> roles = roleGenerator.Generate<UserRole>();

        builder.Entity<IdentityRole>().HasData(roles);
    }
}
