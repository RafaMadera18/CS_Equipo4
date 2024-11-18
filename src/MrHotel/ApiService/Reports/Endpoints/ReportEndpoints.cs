namespace MrHotel.ApiService.Reports.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.Reports.Data;
using MrHotel.ApiService.Reports.Services;
using MrHotel.Database.Entities.Reports;

public static class ReportEndpoints<TProductReportData, TReport>
where TProductReportData : class, IProductReportData<TReport>
where TReport : class, IProductReport
{
    public static async Task<Results<Ok<Guid>, ValidationProblem>> HandlePost(
        [FromBody] TProductReportData reportData,
        [FromServices] ReportManager<IProductReport> reportManager)
    {
        TReport report = reportData.ToReport();

        await reportManager.AddPurchaseReport(report);
        await reportManager.SaveChanges();

        // TODO add GUID on OkResult
        return TypedResults.Ok(report.Id);
    }
}
