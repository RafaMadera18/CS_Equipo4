namespace MrHotel.ApiService.Reports.Validation;

using FluentValidation;

using MrHotel.ApiService.Reports.Data;
using MrHotel.Database.Entities.Reports;

public abstract class ReportDataValidator<TStockReportData, TReport> : AbstractValidator<TStockReportData>
    where TStockReportData : StockReportData<TReport>
    where TReport : StockReport
{
    protected ReportDataValidator()
    {
        this.RuleLevelCascadeMode = CascadeMode.Stop;

        this.RuleFor(stock => stock.StockAdjustmentData)
            .NotNull()
            .ForEach(stock => stock.SetValidator(StockAdjustmentValidator.Instance));
    }
}
