namespace MrHotel.ApiService.Guests.Services;

using System.Collections.Generic;
using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.ApiService.Core.Validation;
using MrHotel.Database.Entities.Guests;

public class GuestManager(
    IEntityRepository<GuestInfo> guestStorage)
{
    public async Task<ValidationResult> AddGuest(GuestInfo guest)
    {
        ValidationResult result = await this.ValidateGuestForAdding(guest);
        if (result.Succeeded)
        {
            guestStorage.EntitySet.Add(guest);
        }

        return result;
    }

    [Pure]
    public ValueTask<GuestInfo?> TryGetGuestById(Guid id)
    {
        return guestStorage.EntitySet.FindAsync(id);
    }

    [Pure]
    public async Task<IReadOnlyCollection<GuestInfo>> GetGuests()
    {
        return await guestStorage.EntitySet.ToArrayAsync();
    }

    public void UpdateGuest(GuestInfo guest)
    {
        guestStorage.EntitySet.Update(guest);
    }

    public void DeleteGuest(GuestInfo guest)
    {
        guestStorage.EntitySet.Remove(guest);
    }

    public Task SaveChanges()
    {
        return guestStorage.SaveChanges();
    }

    private async Task<ValidationResult> ValidateGuestForAdding(GuestInfo guest)
    {
        bool duplicateRoom = await guestStorage.EntitySet.AnyAsync(g => g.Id == guest.Id);

        if (duplicateRoom)
        {
            var error = new ValidationError("DuplicateId", "Duplicate guest id");
            return ValidationResult.Failed(error);
        }

        return ValidationResult.Success;
    }
}
