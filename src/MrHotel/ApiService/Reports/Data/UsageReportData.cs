namespace MrHotel.ApiService.Reports.Data;

using FluentValidation.Results;

using MrHotel.ApiService.Reports.Validation;
using MrHotel.Database.Entities.Reports;

public record UsageReportData(
    IReadOnlyCollection<StockAdjustmentData> StockAdjustmentData,
    string Concept)
    : StockReportData<UsageReport>(StockAdjustmentData)
{
    public override ValidationResult IsValid()
    {
        return UsageReportDataValidator.Instance.Validate(this);
    }

    public override UsageReport ToReport()
    {
        return new UsageReport()
        {
            StockAdjustments = this.ConvertAdjustments(),
            Concept = this.Concept,
        };
    }
}
