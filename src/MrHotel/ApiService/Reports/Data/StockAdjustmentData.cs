namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public record StockAdjustmentData(
    Guid ProductId,
    int Quantity)
{
    public StockAdjustment ToStockAdjustment()
    {
        return new() { Quantity = this.Quantity, ProductId = this.ProductId };
    }
}
