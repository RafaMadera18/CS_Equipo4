namespace MrHotel.Database.Entities.Reports;

public class PurchaseReport : StockReport
{
    public float Price { get; set; } = 0;

    public override int GetNewStock(int currentQuantity, int adjustmentQuantity)
    {
        return currentQuantity + adjustmentQuantity;
    }
}
