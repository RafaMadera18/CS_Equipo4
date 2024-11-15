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

    [Pure]
    private static bool ValidateDateOfBirth(DateOnly dateOfBirth)
    {
        // TODO: Time-zone?
        var todayDate = DateOnly.FromDateTime(DateTime.UtcNow);

        return dateOfBirth < todayDate;
    }

    [Pure]
    private async Task<bool> ValidateGuestUniqueId(GuestInfo guest)
    {
        return await guestStorage.EntitySet.AllAsync(g => g.Id != guest.Id);
    }

    private async Task<ValidationResult> ValidateGuestForAdding(GuestInfo guest)
    {
        List<ValidationError> errors = [];

        bool uniqueGuestId = await this.ValidateGuestUniqueId(guest);
        if (!uniqueGuestId)
        {
            errors.Add(new ValidationError("DuplicateId", "Duplicate guest id"));
        }

        bool validDateOfBirth = ValidateDateOfBirth(guest.DateOfBirth);
        if (!validDateOfBirth)
        {
            errors.Add(new ValidationError("InvalidDateOfBirth", "The date of birth cannot be in the future"));
        }

        const int MaxPhoneNumberDigits = 15;
        if (guest.PhoneNumber.Length > MaxPhoneNumberDigits)
        {
            errors.Add(new ValidationError(
                "InvalidPhoneNumber",
                $"Phone number must not exceed {MaxPhoneNumberDigits} digits"));
        }

        if (errors.Count == 0)
        {
            return ValidationResult.Success;
        }

        return ValidationResult.Failed(errors);
    }
}
