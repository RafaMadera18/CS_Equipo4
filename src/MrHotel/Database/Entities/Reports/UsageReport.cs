namespace MrHotel.Database.Entities.Reports;

public class UsageReport : IProductReport
{
    public Guid Id { get; init; }

    public IReadOnlyCollection<ProductOffset> UsedProducts { get; init; } = [];

    IReadOnlyCollection<ProductOffset> IProductReport.ProductOffsets => this.UsedProducts;
}
