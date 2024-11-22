namespace MrHotel.ApiService.Reports.Validation;

using FluentValidation;

using MrHotel.ApiService.Reports.Data;
using MrHotel.Database.Entities.Reports;

public sealed class PurchaseReportDataValidator : ReportDataValidator<PurchaseReportData, PurchaseReport>
{
    private PurchaseReportDataValidator()
    {
        this.RuleFor(report => report.Price)
            .GreaterThanOrEqualTo(0);
    }

    public static PurchaseReportDataValidator Instance { get; } = new();
}
