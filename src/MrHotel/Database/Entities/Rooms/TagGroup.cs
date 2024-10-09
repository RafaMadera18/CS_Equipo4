namespace MrHotel.Database.Entities.Rooms;
public class TagGroup
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public ICollection<Tag> Tags { get; set; }
}
