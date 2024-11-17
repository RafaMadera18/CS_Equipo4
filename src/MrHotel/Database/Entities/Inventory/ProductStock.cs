namespace MrHotel.Database.Entities.Inventory;

public class ProductStock
{
    public Guid Id { get; init; }

    public required ProductInfo Product { get; init; }

    public int IdealQuantity { get; set; }

    public int StockQuantity { get; set; }
}
