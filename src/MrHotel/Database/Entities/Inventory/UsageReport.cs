namespace MrHotel.Database.Entities.Inventory;

public class UsageReport
{
    public Guid Id { get; init; }

    public List<ProductOffset> ProductOffsets { get; set; } = [];
}
