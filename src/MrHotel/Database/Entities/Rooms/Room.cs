﻿namespace MrHotel.Database.Entities.Rooms;

public class Room
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public ICollection<Tag> Tags { get; set; } = [];
}
