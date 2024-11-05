namespace MrHotel.ApiService.Guests.Services;

using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Validation;
using MrHotel.Database;
using MrHotel.Database.Entities.Guests;

public class GuestManager(AppDbContext db)
{
    public async Task<ValidationResult> AddGuest(GuestInfo guest)
    {
        ValidationResult result = await this.ValidateGuestForAdding(guest);
        if (result.Succeeded)
        {
            db.Guests.Add(guest);
        }

        return result;
    }

    [Pure]
    public bool TryGetGuestById(
        Guid id,
        [MaybeNullWhen(false)] out GuestInfo guest)
    {
        guest = db.Guests.Find(id);
        return guest is not null;
    }

    [Pure]
    public async Task<IReadOnlyCollection<GuestInfo>> GetGuests()
    {
        return await this.GetGuestsQueryBuilder().ToArrayAsync();
    }

    public void UpdateGuest(GuestInfo guest)
    {
        db.Guests.Update(guest);
    }

    public void DeleteGuest(GuestInfo guest)
    {
        db.Guests.Remove(guest);
    }

    public Task SaveChanges()
    {
        return db.SaveChangesAsync();
    }

    [Pure]
    private IQueryable<GuestInfo> GetGuestsQueryBuilder()
    {
        return db.Guests.AsQueryable();
    }

    private async Task<ValidationResult> ValidateGuestForAdding(GuestInfo guest)
    {
        bool duplicateRoom = await this.GetGuestsQueryBuilder().AnyAsync(g => g.Id == guest.Id);

        if (duplicateRoom)
        {
            var error = new ValidationError("DuplicateId", "Duplicate guest id");
            return ValidationResult.Failed(error);
        }

        return ValidationResult.Success;
    }
}
