namespace MrHotel.ApiService.Reports.Validation;

using FluentValidation;

using MrHotel.Database.Entities.Reports;

public sealed class StockAdjustmentValidator : AbstractValidator<StockAdjustment>
{
    private StockAdjustmentValidator()
    {
        this.RuleFor(adjustment => adjustment.Id)
            .NotEqual(Guid.Empty);

        this.RuleFor(adjustment => adjustment.Product)
            .NotNull();

        this.RuleFor(adjustment => adjustment.Quantity)
            .GreaterThanOrEqualTo(0);
    }

    public static StockAdjustmentValidator Instance { get; } = new();
}
