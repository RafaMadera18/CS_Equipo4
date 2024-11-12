namespace MrHotel.ApiService.Guests.Data;

using MrHotel.Database.Entities.Guests;

public record GuestUpdateData(
    string FullName,
    string PhoneNumber,
    DateOnly DateOfBirth)
{
    public void ApplyUpdate(GuestInfo guest)
    {
        guest.FullName = this.FullName;
        guest.PhoneNumber = this.PhoneNumber;
        guest.DateOfBirth = this.DateOfBirth;
    }
}
