namespace MrHotel.Database.Entities.Inventory;

public class PurchaseReport
{
    public Guid Id { get; init; }

    public decimal Price { get; set; } = 0;

    public List<ProductOffset> ProductOffsets { get; set; } = [];
}
