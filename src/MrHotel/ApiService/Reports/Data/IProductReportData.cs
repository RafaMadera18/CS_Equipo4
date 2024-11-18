namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public interface IProductReportData<out TReport>
where TReport : class, IProductReport
{
    public TReport ToReport();
}
