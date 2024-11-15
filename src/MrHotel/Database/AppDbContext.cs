namespace MrHotel.Database;

using System.Diagnostics.CodeAnalysis;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using MrHotel.Database.Entities;
using MrHotel.Database.Entities.Guests;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;
using MrHotel.Identity;

using RaptorUtils.AspNet.Identity;

[SuppressMessage(
    "Roslynator",
    "RCS1170:Use read-only auto-implemented property",
    Justification = "Setters of DbSet properties are required by EF")]
public class AppDbContext(
    DbContextOptions<AppDbContext> options)
    : IdentityDbContext<AppUser>(options)
{
    public DbSet<RoomInfo> Rooms { get; private set; } = null!;

    public DbSet<GuestInfo> Guests { get; private set; } = null!;

    public DbSet<ReservationInfo> Reservations { get; private set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

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
