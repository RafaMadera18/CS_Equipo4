namespace MrHotel.ApiService.Reservations.Services;

using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.Database.Entities.Reservations;

public class ReservationManager(
    IEntityRepository<ReservationInfo> reservationStorage)
{
    public async Task AddReservation(ReservationInfo reservation)
    {
        await reservationStorage.EntitySet.AddAsync(reservation);
    }

    [Pure]
    public async Task<ReservationInfo?> TryGetReservationById(Guid id, bool onlyActive = false)
    {
        return await this.QueryReservations(onlyActive)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    [Pure]
    public async Task<IReadOnlyCollection<ReservationInfo>> GetReservations(bool onlyActive = false)
    {
        return await this.QueryReservations(onlyActive).ToArrayAsync();
    }

    public void UpdateReservation(ReservationInfo reservation)
    {
        reservationStorage.EntitySet.Update(reservation);
    }

    public Task SaveChanges()
    {
        return reservationStorage.SaveChanges();
    }

    private IQueryable<ReservationInfo> QueryReservations(bool onlyActive)
    {
        var reservations = reservationStorage.EntitySet
            .Include(reservation => reservation.Guest)
            .Include(reservation => reservation.Room);

        return onlyActive
            ? reservations.Where(reservation => !reservation.CheckOutDone)
            : reservations;
    }
}
