namespace MrHotel.ApiService.Inventory.Services;

using System.Collections.Generic;
using System.Diagnostics.Contracts;

using Microsoft.EntityFrameworkCore;
using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.Database.Entities.Inventory;

public class InventoryManager(
    IEntityRepository<ProductStock> productStorage)
{
    public async Task AddProductStock(ProductStock product)
    {
        //TODO add validation
        await productStorage.EntitySet.AddAsync(product);
    }

    [Pure]
    public ValueTask<ProductStock?> TryGetProductStockById(Guid id)
    {
        return productStorage.EntitySet.FindAsync(id);
    }

    [Pure]
    public async Task<IReadOnlyCollection<ProductStock>> GetProductStocks()
    {
        return await productStorage.EntitySet.ToArrayAsync();
    }

    public void UpdateProductStock(ProductStock product)
    {
        productStorage.EntitySet.Update(product);
    }

    public void DeleteProductStock(ProductStock product)
    {
        productStorage.EntitySet.Remove(product);
    }

    public Task SaveChanges()
    {
        return productStorage.SaveChanges();
    }
}
