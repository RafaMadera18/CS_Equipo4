namespace MrHotel.ApiService.Core.Storage.Entities;

using Microsoft.EntityFrameworkCore;

public interface IEntityRepository<TEntity>
    where TEntity : class
{
    public DbSet<TEntity> EntitySet { get; }

    public Task SaveChanges();
}
