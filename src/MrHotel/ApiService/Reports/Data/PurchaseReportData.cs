namespace MrHotel.ApiService.Reports.Data;

using MrHotel.Database.Entities.Reports;

public class PurchaseReportData(
    decimal price,
    IReadOnlyCollection<ProductOffset> purchasedProducts) : IProductReportData<PurchaseReport>
{
    public PurchaseReport ToReport()
    {
        return new PurchaseReport() { Price = price, PurchasedProducts = purchasedProducts };
    }
}
