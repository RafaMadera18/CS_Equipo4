namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public record PurchaseReportData(
    decimal Price,
    IReadOnlyCollection<ProductOffsetData> PurchasedProducts) : IProductReportData<PurchaseReport>
{
    IReadOnlyCollection<ProductOffsetData> IProductReportData<PurchaseReport>.ProductOffsetsData => this.PurchasedProducts;

    public PurchaseReport ToReport()
    {
        return new PurchaseReport() { Price = this.Price, PurchasedProducts = this.ConvertOffsets() };
    }
}
