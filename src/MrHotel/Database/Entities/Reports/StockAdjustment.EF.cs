namespace MrHotel.Database.Entities.Reports;

using System.Text.Json.Serialization;

public partial class StockAdjustment
{
    [JsonIgnore]
    public Guid ProductId { get; init; }
}
