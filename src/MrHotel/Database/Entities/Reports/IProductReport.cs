namespace MrHotel.Database.Entities.Reports;

public interface IProductReport
{
    IReadOnlyCollection<ProductOffset> ProductOffsets { get; }

    Guid Id { get; }
}
