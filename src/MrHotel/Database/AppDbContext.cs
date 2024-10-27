namespace MrHotel.Database;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using MrHotel.Database.Entities;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;

public class AppDbContext(
    DbContextOptions<AppDbContext> options)
    : IdentityDbContext<AppUser>(options)
{
    public DbSet<Room> Rooms { get; init; }

    public DbSet<Reservation> Reservations { get; init; }
}
