namespace MrHotel.Database.Entities.Inventory;

public class ProductInfo
{
    public Guid Id { get; init; }

    public required string Name { get; set; }
}
