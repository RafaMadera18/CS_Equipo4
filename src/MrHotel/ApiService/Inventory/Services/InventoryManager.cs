namespace MrHotel.ApiService.Inventory.Services;

using System.Collections.Generic;
using System.Diagnostics.Contracts;

using FluentValidation.Results;

using Microsoft.EntityFrameworkCore;
using MrHotel.ApiService.Core.Storage.Entities;
using MrHotel.ApiService.Inventory.Validator;
using MrHotel.Database.Entities.Inventory;

public class InventoryManager(
    IEntityRepository<ProductStock> productStorage)
{
    public async Task<ValidationResult> AddProductStock(ProductStock stock)
    {
        ValidationResult result = StockAddingValidator.Instance.Validate(stock);
        if (result.IsValid)
        {
            await productStorage.EntitySet.AddAsync(stock);
        }

        return result;
    }

    [Pure]
    public ValueTask<ProductStock?> TryGetProductStockById(Guid id)
    {
        return productStorage.EntitySet.FindAsync(id);
    }

    [Pure]
    public async Task<IReadOnlyCollection<ProductStock>> GetProductStocks()
    {
        return await productStorage.EntitySet.Include(p => p.Product).ToArrayAsync();
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
