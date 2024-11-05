namespace MrHotel.ApiService.Reservations.Services;

using System.Diagnostics.CodeAnalysis;
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
    public bool TryGetReservationById(
        Guid id,
        [MaybeNullWhen(false)] out ReservationInfo reservation)
    {
        reservation = db.Reservations.Find(id);
        return reservation is not null;
    }

    [Pure]
    public async Task<IReadOnlyCollection<ReservationInfo>> GetReservations(bool onlyActive = false)
    {
        return await GetReservations().ToArrayAsync();

        IQueryable<ReservationInfo> GetReservations()
        {
            var reservations = db.Reservations
                .Include(reservation => reservation.Guest)
                .Include(reservation => reservation.Room);

            return onlyActive
                ? reservations.Where(reservation => !reservation.CheckOutDone)
                : reservations;
        }
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
