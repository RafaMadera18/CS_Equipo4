namespace MrHotel.ApiService.Reports.Endpoints;

using MrHotel.ApiService.Reports.Data;
using MrHotel.Database.Entities.Reports;

public static class ReportApiExtensions
{
    public static IEndpointConventionBuilder MapReportApi<TProductReportData, TReport>(
        this IEndpointRouteBuilder endpoints)
        where TProductReportData : class, IProductReportData<TReport>
        where TReport : class, IProductReport
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup("/reports").RequireAuthorization();

        routeGroup.MapPost(string.Empty, ReportEndpoints<TProductReportData, TReport>.HandlePost);

        return routeGroup.WithTags("Reports");
    }
}
