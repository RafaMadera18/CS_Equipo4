namespace MrHotel.Database.Entities.Reservations;

public class TagGroup
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public ICollection<Tag> Tags { get; set; }
}
