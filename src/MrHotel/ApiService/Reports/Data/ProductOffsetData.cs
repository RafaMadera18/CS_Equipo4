namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public record ProductOffsetData(
    Guid ProductId,
    int Quantity)
{
    public ProductOffset ToProductOffset()
    {
        return new() { Quantity = this.Quantity, ProductId = this.ProductId };
    }
}
