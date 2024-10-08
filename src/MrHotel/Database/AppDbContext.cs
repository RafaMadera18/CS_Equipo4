namespace MrHotel.Database;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using MrHotel.Database.Entities;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Identity;

public class AppDbContext(
    DbContextOptions<AppDbContext> options)
    : IdentityDbContext<AppUser>(options)
{
    public DbSet<Room> Rooms { get; init; }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        base.ConfigureConventions(configurationBuilder);

        configurationBuilder.Properties<UserRole>().HaveConversion<string>();
    }
}
