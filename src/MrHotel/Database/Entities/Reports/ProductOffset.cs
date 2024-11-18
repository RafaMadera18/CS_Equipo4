namespace MrHotel.Database.Entities.Reports;

using MrHotel.Database.Entities.Inventory;

public class ProductOffset
{
    public Guid Id { get; init; }

    public required ProductInfo Product { get; init; }

    public int Quantity { get; set; }
}
