namespace MrHotel.ApiService.Reservations.Services;

using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.Database;
using MrHotel.Database.Entities.Reservations;

public class ReservationManager(AppDbContext db)
{
    public async Task AddReservation(ReservationInfo reservation)
    {
        await db.Reservations.AddAsync(reservation);
    }

    [Pure]
    public IQueryable<ReservationInfo> GetReservations()
    {
        return db.Reservations
            .AsQueryable()
            .AsNoTracking()
            .Include(reservation => reservation.Room);
    }

    public void DeleteReservation(ReservationInfo reservation)
    {
        db.Reservations.Remove(reservation);
    }

    public Task SaveChanges()
    {
        return db.SaveChangesAsync();
    }
}
