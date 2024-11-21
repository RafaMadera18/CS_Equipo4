namespace MrHotel.ApiService.Reports.Endpoints;

using MrHotel.ApiService.Reports.Data;
using MrHotel.Database.Entities.Reports;

public static class ReportApiExtensions
{
    public static IEndpointRouteBuilder MapReportApi<TProductReportData, TProductReport>(
        this IEndpointRouteBuilder endpoints,
        string groupName)
        where TProductReportData : class, IProductReportData<TProductReport>
        where TProductReport : class, IProductReport
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        var routeGroup = endpoints.MapGroup(groupName);

        routeGroup.MapPost(string.Empty, ReportEndpoints<TProductReportData, TProductReport>.HandlePost);

        return endpoints;
    }
}
