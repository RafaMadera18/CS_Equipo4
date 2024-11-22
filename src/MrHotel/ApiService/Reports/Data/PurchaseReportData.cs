namespace MrHotel.ApiService.Reports.Data;

using FluentValidation.Results;

using MrHotel.ApiService.Reports.Validation;
using MrHotel.Database.Entities.Reports;

public record PurchaseReportData(
    IReadOnlyCollection<StockAdjustmentData> StockAdjustmentData,
    float Price)
    : StockReportData<PurchaseReport>(StockAdjustmentData)
{
    public override ValidationResult IsValid()
    {
        return PurchaseReportDataValidator.Instance.Validate(this);
    }

    public override PurchaseReport ToReport()
    {
        return new PurchaseReport()
        {
            Price = this.Price,
            StockAdjustments = this.ConvertAdjustments(),
        };
    }
}
