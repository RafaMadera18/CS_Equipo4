namespace MrHotel.ApiService.Inventory.Data;

using MrHotel.Database.Entities.Inventory;

public record ProductStockCreationResult(
    Guid StockId,
    Guid ProductId)
{
    public static ProductStockCreationResult FromStock(ProductStock stock) => new(stock.Id, stock.Product.Id);
}
