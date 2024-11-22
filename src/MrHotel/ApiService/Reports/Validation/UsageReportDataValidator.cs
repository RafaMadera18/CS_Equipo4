namespace MrHotel.ApiService.Reports.Validation;

using FluentValidation;

using MrHotel.ApiService.Reports.Data;
using MrHotel.Database.Entities.Reports;

public sealed class UsageReportDataValidator : ReportDataValidator<UsageReportData, UsageReport>
{
    private UsageReportDataValidator()
    {
        this.RuleFor(report => report.Concept)
            .NotEmpty();
    }

    public static UsageReportDataValidator Instance { get; } = new();
}
