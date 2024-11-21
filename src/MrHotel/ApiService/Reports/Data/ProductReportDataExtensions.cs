namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public static class ProductReportDataExtensions
{
    public static IReadOnlyCollection<ProductOffset> ConvertOffsets(this IProductReportData<IProductReport> reportData)
    {
        return reportData.ProductOffsetsData.Select(p => p.ToProductOffset()).ToArray();
    }
}
