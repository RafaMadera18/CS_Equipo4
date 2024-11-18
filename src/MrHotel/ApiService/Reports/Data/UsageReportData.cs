namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public class UsageReportData(
    IReadOnlyCollection<ProductOffset> usedProducts) : IProductReportData<UsageReport>
{
    public UsageReport ToReport()
    {
        return new UsageReport() { UsedProducts = usedProducts };
    }
}
