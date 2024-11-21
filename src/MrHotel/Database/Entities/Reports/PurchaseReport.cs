namespace MrHotel.Database.Entities.Reports;

using System.Collections.Generic;

public class PurchaseReport : IProductReport
{
    public Guid Id { get; init; }

    public decimal Price { get; set; } = 0;

    public IReadOnlyCollection<ProductOffset> PurchasedProducts { get; init; } = [];

    IReadOnlyCollection<ProductOffset> IProductReport.ProductOffsets => this.PurchasedProducts;
}
