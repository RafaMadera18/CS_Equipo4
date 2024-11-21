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
        Dictionary<Guid, ProductStock> stocks = (await inventoryManager.GetProductStocks()).ToDictionary(stock => stock.Product.Id, stock => stock);

        foreach (StockAdjustment adjustment in report.StockAdjustments)
        {
            if (stocks.TryGetValue(adjustment.ProductId, out ProductStock? stock))
            {
                stock.StockQuantity = report.GetNewStock(stock.StockQuantity, adjustment.Quantity);
                inventoryManager.UpdateProductStock(stock);
            }
        }

        reportStorage.EntitySet.Add(report);
        await this.SaveChanges();
    }

    public async Task<IReadOnlyCollection<TReport>> GetReports()
    {
        return await reportStorage.EntitySet.ToArrayAsync();
    }

    private async Task SaveChanges()
    {
        await inventoryManager.SaveChanges();
        await reportStorage.SaveChanges();
    }
}
