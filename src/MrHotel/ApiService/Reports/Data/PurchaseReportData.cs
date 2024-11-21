namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public record PurchaseReportData(
    IReadOnlyCollection<StockAdjustmentData> StockAdjustmentData,
    float Price)
    : StockReportData<PurchaseReport>(StockAdjustmentData)
{
    public override PurchaseReport ToReport()
    {
        return new PurchaseReport()
        {
            Price = this.Price,
            StockAdjustments = this.ConvertAdjustments(),
        };
    }
}
