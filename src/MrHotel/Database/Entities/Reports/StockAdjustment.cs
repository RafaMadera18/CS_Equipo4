namespace MrHotel.Database.Entities.Reports;

using MrHotel.Database.Entities.Inventory;

public partial class StockAdjustment
{
    public Guid Id { get; init; }

    public ProductInfo Product { get; init; } = null!;

    public int Quantity { get; set; }
}
