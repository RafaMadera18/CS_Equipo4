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
    public async Task<IReadOnlyCollection<ReservationInfo>> GetReservations(bool onlyActive = false)
    {
        return await QueryReservations().ToArrayAsync();

        IQueryable<ReservationInfo> QueryReservations()
        {
            var reservations = reservationStorage.EntitySet
                .Include(reservation => reservation.Guest)
                .Include(reservation => reservation.Room);

            return onlyActive
                ? reservations.Where(reservation => !reservation.CheckOutDone)
                : reservations;
        }
    }

    public void DeleteReservation(ReservationInfo reservation)
    {
        reservationStorage.EntitySet.Remove(reservation);
    }

    public Task SaveChanges()
    {
        return reservationStorage.SaveChanges();
    }
}
