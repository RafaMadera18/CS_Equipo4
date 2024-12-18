namespace MrHotel.Database.Entities.Reports;

public abstract class StockReport
{
    public Guid Id { get; init; }

    public DateTimeOffset RegistrationDate { get; private init; } = DateTimeOffset.UtcNow;

    public IReadOnlyCollection<StockAdjustment> StockAdjustments { get; init; } = [];

    public abstract int GetNewStock(int currentQuantity, int adjustmentQuantity);
}
