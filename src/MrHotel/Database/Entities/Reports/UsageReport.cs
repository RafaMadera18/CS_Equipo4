namespace MrHotel.Database.Entities.Reports;

public class UsageReport : StockReport
{
    public required string Concept { get; init; }

    public override int GetNewStock(int currentQuantity, int adjustmentQuantity)
    {
        return currentQuantity - adjustmentQuantity;
    }
}
