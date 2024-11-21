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
    public async Task AddReport(TReport report)
    {
        // TODO add validation
        Dictionary<Guid, ProductStock> stocks = (await inventoryManager.GetProductStocks()).ToDictionary(stock => stock.Product.Id, stock => stock);

        foreach (ProductOffset offset in report.ProductOffsets)
        {
            if (stocks.TryGetValue(offset.ProductId, out ProductStock? stock))
            {
                stock.StockQuantity += offset.Quantity;
                inventoryManager.UpdateProductStock(stock);
            }
        }

        purchaseStorage.EntitySet.Add(report);
        await this.SaveChanges();
    }

    // TODO add get
    private async Task SaveChanges()
    {
        await inventoryManager.SaveChanges();
        await purchaseStorage.SaveChanges();
    }
}
