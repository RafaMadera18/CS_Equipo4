namespace MrHotel.ApiService.Guests.Services;

using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.Database;
using MrHotel.Database.Entities.Guests;

public class GuestManager(AppDbContext db)
{
    public void AddGuest(Guest guest)
    {
        db.Guests.Add(guest);
    }

    [Pure]
    public IQueryable<Guest> GetGuests()
    {
        return db.Guests.AsQueryable().AsNoTracking();
    }

    public void UpdateGuest(Guest guest)
    {
        db.Guests.Update(guest);
    }

    public void DeleteGuest(Guest guest)
    {
        db.Guests.Remove(guest);
    }

    public Task SaveChanges()
    {
        return db.SaveChangesAsync();
    }
}
