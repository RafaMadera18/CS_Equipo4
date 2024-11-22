namespace MrHotel.ApiService.Reports.Endpoints;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using MrHotel.ApiService.Reports.Data;
using MrHotel.ApiService.Reports.Services;
using MrHotel.Database.Entities.Reports;

public static class ReportEndpoints<TStockReportData, TStockReport>
    where TStockReportData : StockReportData<TStockReport>
    where TStockReport : StockReport
{
    public static async Task<Results<Ok<Guid>, ValidationProblem>> HandlePost(
        [FromBody] TStockReportData reportData,
        [FromServices] ReportManager<TStockReport> reportManager)
    {
        TStockReport report = reportData.ToReport();
        await reportManager.AddReport(report);
        return TypedResults.Ok(report.Id);
    }

    public static async Task<Ok<IEnumerable<TStockReport>>> HandleGet(
        [FromServices] ReportManager<TStockReport> reportManager)
    {
        IEnumerable<TStockReport> guests = await reportManager.GetReports();

        return TypedResults.Ok(guests);
    }
}
