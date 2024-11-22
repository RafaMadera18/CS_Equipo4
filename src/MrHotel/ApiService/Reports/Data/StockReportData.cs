namespace MrHotel.ApiService.Reports.Data;

using FluentValidation.Results;

using MrHotel.Database.Entities.Reports;

public abstract record StockReportData<TReport>(
    IReadOnlyCollection<StockAdjustmentData> StockAdjustmentData)
    where TReport : StockReport
{
    public abstract TReport ToReport();

    public abstract ValidationResult IsValid();

    protected IReadOnlyCollection<StockAdjustment> ConvertAdjustments()
    {
        return this.StockAdjustmentData.Select(p => p.ToStockAdjustment()).ToArray();
    }
}
