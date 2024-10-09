namespace MrHotel.Database.Entities.Rooms;
public class Room
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public ICollection<Tag> Tags { get; set; } = [];

    public static Room Create(string name)
    {
        return new()
        {
            Id = Guid.NewGuid(),
            Name = name,
        };
    }
}
