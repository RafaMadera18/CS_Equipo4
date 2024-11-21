namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public record UsageReportData(
    IReadOnlyCollection<ProductOffsetData> UsedProducts) : IProductReportData<UsageReport>
{
    IReadOnlyCollection<ProductOffsetData> IProductReportData<UsageReport>.ProductOffsetsData => this.UsedProducts;

    public UsageReport ToReport()
    {
        return new UsageReport() { UsedProducts = this.ConvertOffsets() };
    }
}
