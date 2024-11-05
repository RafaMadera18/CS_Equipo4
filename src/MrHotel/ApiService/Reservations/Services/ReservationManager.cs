namespace MrHotel.ApiService.Reservations.Services;

using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.Database.Entities.Reservations;

public class ReservationManager(
    IEntityRepository<ReservationInfo> reservationStorage)
{
    public void AddReservation(ReservationInfo reservation)
    {
        reservationStorage.EntitySet.Add(reservation);
    }

    [Pure]
    public bool TryGetReservationById(
        Guid id,
        [MaybeNullWhen(false)] out ReservationInfo reservation)
    {
        reservation = reservationStorage.EntitySet.Find(id);
        return reservation is not null;
    }

    [Pure]
    public async Task<IReadOnlyCollection<ReservationInfo>> GetReservations(bool onlyActive = false)
    {
        return await GetReservations().ToArrayAsync();

        IQueryable<ReservationInfo> GetReservations()
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
