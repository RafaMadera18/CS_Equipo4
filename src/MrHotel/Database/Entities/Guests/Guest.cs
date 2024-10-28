namespace MrHotel.Database.Entities.Guests;

public class Guest
{
    public required Guid Id { get; set; }

    public required string FullName { get; set; }

    public required string PhoneNumber { get; set; }

    public required DateTimeOffset DateOfBirth { get; set; }
}
