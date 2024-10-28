namespace MrHotel.ApiService.Reservations.Services;

using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.Database;
using MrHotel.Database.Entities.Reservations;

public class ReservationManager(AppDbContext db)
{
    public async Task AddReservation(Reservation reservation)
    {
        await db.Reservations.AddAsync(reservation);
    }

    [Pure]
    public IQueryable<Reservation> GetReservations()
    {
        return db.Reservations.AsQueryable().AsNoTracking();
    }

    public void DeleteReservation(Reservation reservation)
    {
        db.Reservations.Remove(reservation);
    }

    public Task SaveChanges()
    {
        return db.SaveChangesAsync();
    }
}
