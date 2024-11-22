namespace MrHotel.ApiService.Inventory.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.Inventory.Data;
using MrHotel.ApiService.Inventory.Services;
using MrHotel.Database.Entities.Inventory;

public static class InventoryEndpoints
{
    public static async Task<Results<Ok<ProductStockCreationResult>, ValidationProblem>> HandlePost(
        [FromBody] ProductStockCreationData productStockCreationData,
        [FromServices] InventoryManager inventoryManager)
    {
        ProductStock productStock = productStockCreationData.ToProductStock();

        await inventoryManager.AddProductStock(productStock);
        await inventoryManager.SaveChanges();

        var result = ProductStockCreationResult.FromStock(productStock);
        return TypedResults.Ok(result);
    }

    public static async Task<Results<NoContent, NotFound>> HandlePut(
        [FromRoute] Guid productStockId,
        [FromBody] ProductStockUpdateData productStockUpdateData,
        [FromServices] InventoryManager inventoryManager)
    {
        ProductStock? productStock = await inventoryManager.TryGetProductStockById(productStockId);

        if (productStock is null)
        {
            return TypedResults.NotFound();
        }

        inventoryManager.UpdateProductStock(productStock);
        productStockUpdateData.ApplyUpdate(productStock);
        await inventoryManager.SaveChanges();

        return TypedResults.NoContent();
    }

    public static async Task<Results<NoContent, NotFound>> HandleDelete(
        [FromRoute] Guid productStockId,
        [FromServices] InventoryManager inventoryManager)
    {
        ProductStock? productStock = await inventoryManager.TryGetProductStockById(productStockId);

        if (productStock is null)
        {
            return TypedResults.NotFound();
        }

        inventoryManager.DeleteProductStock(productStock);
        await inventoryManager.SaveChanges();

        return TypedResults.NoContent();
    }

    public static async Task<Ok<IEnumerable<ProductStock>>> HandleGet(
        [FromServices] InventoryManager inventoryManager)
    {
        IEnumerable<ProductStock> stocks = await inventoryManager.GetProductStocks();

        return TypedResults.Ok(stocks);
    }
}
