namespace MrHotel.ApiService.Reports.Validation;

using FluentValidation;

using MrHotel.ApiService.Reports.Data;

public sealed class StockAdjustmentValidator : AbstractValidator<StockAdjustmentData>
{
    private StockAdjustmentValidator()
    {
        this.RuleFor(adjustment => adjustment.ProductId)
            .NotNull();

        this.RuleFor(adjustment => adjustment.Quantity)
            .GreaterThanOrEqualTo(0);
    }

    public static StockAdjustmentValidator Instance { get; } = new();
}
