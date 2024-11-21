namespace MrHotel.ApiService.Reports.Endpoints;

using MrHotel.ApiService.Reports.Data;
using MrHotel.ApiService.Reports.Validation;
using MrHotel.Database.Entities.Reports;

public static class ReportApiExtensions
{
    public static IEndpointRouteBuilder MapReportApi(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/reports").RequireAuthorization();

        MapApiFor<PurchaseReportData, PurchaseReport>("/purchases", routeGroup);

        MapApiFor<UsageReportData, UsageReport>("/usages", routeGroup);

        return routeGroup.WithTags("Reports");
    }

    private static void MapApiFor<TStockReportData, TStockReport>(
        string groupname,
        RouteGroupBuilder routeGroup)
        where TStockReportData : StockReportData<TStockReport>
        where TStockReport : StockReport
    {
        routeGroup.MapPost(groupname, ReportEndpoints<TStockReportData, TStockReport>.HandlePost);

        routeGroup.MapGet(groupname, ReportEndpoints<TStockReportData, TStockReport>.HandleGet);
    }
}
