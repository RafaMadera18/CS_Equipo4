namespace MrHotel.ApiService.Guests.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Guests;

public record GuestCreationData(
    string FullName,
    string PhoneNumber,
    DateOnly DateOfBirth)
{
    [Pure]
    public GuestInfo ToGuestInfo()
    {
        return new()
        {
            FullName = this.FullName.Trim(),
            PhoneNumber = this.PhoneNumber.Trim(),
            DateOfBirth = this.DateOfBirth,
        };
    }
}
