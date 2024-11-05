namespace MrHotel.ApiService.Guests.Services;

using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
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
    public bool TryGetGuestById(
        Guid id,
        [MaybeNullWhen(false)] out GuestInfo guest)
    {
        guest = guestStorage.EntitySet.Find(id);
        return guest is not null;
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
    bool duplicateGuestID = await guestStorage.EntitySet.AnyAsync(g => g.Id == guest.Id);

    if (duplicateGuestID)
    {
        var error = new ValidationError("DuplicateId", "Duplicate guest id");
        return ValidationResult.Failed(error);
    }

    var dateToday = DateOnly.FromDateTime(DateTime.Now);
    var invalidDateOfBirth = guest.DateOfBirth.CompareTo(dateToday) > 0;
    if (invalidDateOfBirth)
    {
        var error = new ValidationError("InvalidDateOfBirth", "The date of birth cannot be in the future.");
        return ValidationResult.Failed(error);
    }
    else if (guest.PhoneNumber.Length != 10)
    {
        var error = new ValidationError("InvalidPhoneNumber", "Phone number lenght is different than 10 digits.");
        return ValidationResult.Failed(error);
    }

    return ValidationResult.Success;
}
}
