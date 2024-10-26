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

    public void DeleteReservation(Reservation reservation)
    {
        db.Reservations.Remove(reservation);
    }

    [Pure]
    public IQueryable<Reservation> GetReservations(
        QueryTrackingBehavior trackingBehavior = QueryTrackingBehavior.NoTracking)
    {
        return db.Reservations
            .AsQueryable()
            .AsTracking(trackingBehavior);
    }

    public Task SaveChanges()
    {
        return db.SaveChangesAsync();
    }
}
