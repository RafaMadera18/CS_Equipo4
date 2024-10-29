namespace MrHotel.Database.Entities.Guests;

public class GuestInfo
{
    public required Guid Id { get; set; }

    public required string FullName { get; set; }

    public required string PhoneNumber { get; set; }

    public required DateOnly DateOfBirth { get; set; }
}
