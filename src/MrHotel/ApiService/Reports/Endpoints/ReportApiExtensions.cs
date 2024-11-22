namespace MrHotel.ApiService.Reports.Endpoints;

using MrHotel.ApiService.Reports.Data;
using MrHotel.Database.Entities.Reports;

public static class ReportApiExtensions
{
    public static IEndpointRouteBuilder MapReportApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/reports").RequireAuthorization();

        routeGroup.MapReportApi<PurchaseReportData, PurchaseReport>("/purchases");

        routeGroup.MapReportApi<UsageReportData, UsageReport>("/usages");

        return routeGroup.WithTags("Reports");
    }

    private static void MapReportApi<TStockReportData, TStockReport>(
        this RouteGroupBuilder routeGroup,
        string groupName)
        where TStockReportData : StockReportData<TStockReport>
        where TStockReport : StockReport
    {
        routeGroup.MapPost(groupName, ReportEndpoints<TStockReportData, TStockReport>.HandlePost);

        routeGroup.MapGet(groupName, ReportEndpoints<TStockReportData, TStockReport>.HandleGet);
    }
}
