namespace MrHotel.ApiService.Reports.Services;

using Microsoft.EntityFrameworkCore;

using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.ApiService.Inventory.Services;
using MrHotel.Database.Entities.Inventory;
using MrHotel.Database.Entities.Reports;

public class ReportManager<TReport>(
    IEntityRepository<TReport> reportStorage,
    InventoryManager inventoryManager)
    where TReport : StockReport
{
    public async Task AddReport(TReport report)
    {
        await this.ApplyToStock(report);
        reportStorage.EntitySet.Add(report);
        await this.SaveChanges();
    }

    public async Task<IReadOnlyCollection<TReport>> GetReports()
    {
        return await reportStorage.EntitySet.ToArrayAsync();
    }

    private async Task ApplyToStock(TReport report)
    {
        Dictionary<Guid, ProductStock> productIdToStockMap = await this.GetProductIdToStockMap();

        foreach (StockAdjustment adjustment in report.StockAdjustments)
        {
            if (productIdToStockMap.TryGetValue(adjustment.ProductId, out ProductStock? stock))
            {
                stock.StockQuantity = report.GetNewStock(stock.StockQuantity, adjustment.Quantity);
                inventoryManager.UpdateProductStock(stock);
            }
        }
    }

    private async Task<Dictionary<Guid, ProductStock>> GetProductIdToStockMap()
    {
        IEnumerable<ProductStock> stocks = await inventoryManager.GetProductStocks();
        return stocks.ToDictionary(stock => stock.Product.Id, stock => stock);
    }

    private async Task SaveChanges()
    {
        await inventoryManager.SaveChanges();
        await reportStorage.SaveChanges();
    }
}
