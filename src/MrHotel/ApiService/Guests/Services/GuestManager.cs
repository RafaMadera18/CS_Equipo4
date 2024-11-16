namespace MrHotel.ApiService.Guests.Services;

using System.Collections.Generic;
using System.Diagnostics.Contracts;

using FluentValidation.Results;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.ApiService.Guests.Validation;
using MrHotel.Database.Entities.Guests;

public class GuestManager(
    IEntityRepository<GuestInfo> guestStorage)
{
    public async Task<ValidationResult> AddGuest(GuestInfo guest)
    {
        ValidationResult result = GuestAddingValidator.Instance.Validate(guest);
        if (result.IsValid)
        {
            await guestStorage.EntitySet.AddAsync(guest);
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
}
