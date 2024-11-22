namespace MrHotel.ApiService.Inventory.Data;

using MrHotel.Database.Entities.Inventory;

public record ProductStockUpdateData(
    string Name,
    int IdealQuantity)
{
    public void ApplyUpdate(ProductStock productStock)
    {
        productStock.Product.Name = this.Name;
        productStock.IdealQuantity = this.IdealQuantity;
    }
}
