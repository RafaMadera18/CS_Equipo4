namespace MrHotel.ApiService.Inventory.Validator;

using FluentValidation;
using MrHotel.Database.Entities.Inventory;

public class StockAddingValidator : AbstractValidator<ProductStock>
{
    private StockAddingValidator()
    {
        this.RuleLevelCascadeMode = CascadeMode.Stop;

        this.RuleFor(stock => stock.Id)
            .Equal(Guid.Empty);

        this.RuleFor(stock => stock.Product)
            .NotNull();

        this.RuleFor(stock => stock.StockQuantity)
            .GreaterThanOrEqualTo(0);

        this.RuleFor(stock => stock.IdealQuantity)
            .GreaterThanOrEqualTo(0);
    }

    public static StockAddingValidator Instance { get; } = new();
}
