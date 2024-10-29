namespace MrHotel.Database;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using MrHotel.Database.Entities;
using MrHotel.Database.Entities.Guests;
using MrHotel.Database.Entities.Reservations;
using MrHotel.Database.Entities.Rooms;

public class AppDbContext(
    DbContextOptions<AppDbContext> options)
    : IdentityDbContext<AppUser>(options)
{
    public DbSet<RoomInfo> Rooms { get; init; }

    public DbSet<GuestInfo> Guests { get; init; }

    public DbSet<ReservationInfo> Reservations { get; init; }
}
