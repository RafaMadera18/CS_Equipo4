namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public record UsageReportData(
    IReadOnlyCollection<StockAdjustmentData> StockAdjustmentData,
    string Concept)
    : StockReportData<UsageReport>(StockAdjustmentData)
{
    public override UsageReport ToReport()
    {
        return new UsageReport()
        {
            StockAdjustments = this.ConvertAdjustments(),
            Concept = this.Concept,
        };
    }
}
