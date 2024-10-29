namespace MrHotel.ApiService.Guests.Data;

using System.Diagnostics.Contracts;
using System.Text.Json.Serialization;

using MrHotel.Database.Entities.Guests;

public record CreateGuestRequest(
    string FullName,
    string PhoneNumber,
    DateOnly DateOfBirth)
{
    [Pure]
    public Guest Create()
    {
        return new()
        {
            Id = Guid.NewGuid(),
            FullName = this.FullName.Trim(),
            PhoneNumber = this.PhoneNumber.Trim(),
            DateOfBirth = this.DateOfBirth,
        };
    }
}
