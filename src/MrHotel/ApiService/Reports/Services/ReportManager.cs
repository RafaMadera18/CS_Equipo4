namespace MrHotel.ApiService.Reports.Services;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.ApiService.Inventory.Services;
using MrHotel.Database.Entities.Inventory;
using MrHotel.Database.Entities.Reports;

public class ReportManager<TReport>(
    IEntityRepository<TReport> purchaseStorage,
    InventoryManager inventoryManager)
    where TReport : class, IProductReport
{
    public async Task AddPurchaseReport(TReport report)
    {
        // TODO add validation
        foreach (ProductOffset offset in report.ProductOffsets)
        {
            ProductStock? currentProduct = await inventoryManager.TryGetProductStockById(offset.Product.Id);

            if (currentProduct != null)
            {
                currentProduct.StockQuantity += offset.Quantity;
                inventoryManager.UpdateProductStock(currentProduct);
            }
        }

        purchaseStorage.EntitySet.Add(report);
        await this.SaveChanges();
    }

    public async Task SaveChanges()
    {
        await inventoryManager.SaveChanges();
        await purchaseStorage.SaveChanges();
    }
}
