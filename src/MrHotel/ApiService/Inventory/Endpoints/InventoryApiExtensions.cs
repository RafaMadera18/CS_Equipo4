namespace MrHotel.ApiService.Inventory.Endpoints;

public static class InventoryApiExtensions
{
    public static IEndpointConventionBuilder MapInventoryApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/inventory").RequireAuthorization();

        routeGroup.MapPost(string.Empty, InventoryEndpoints.HandlePost);

        routeGroup.MapGet(string.Empty, InventoryEndpoints.HandleGet);

        routeGroup.MapPut("{productStockId}", InventoryEndpoints.HandlePut);

        routeGroup.MapDelete("{productStockId}", InventoryEndpoints.HandleDelete);

        return routeGroup.WithTags("Inventory");
    }
}
