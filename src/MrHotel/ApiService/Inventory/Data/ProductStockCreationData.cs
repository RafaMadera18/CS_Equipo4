namespace MrHotel.ApiService.Inventory.Data;

using System.Diagnostics.Contracts;

using MrHotel.Database.Entities.Inventory;

public record ProductStockCreationData(
    string ProductName)
{
    [Pure]
    public ProductStock ToProductStock()
    {
        var productInfo = new ProductInfo() { Name = this.ProductName };
        return new ProductStock() { Product = productInfo };
    }
}
