namespace MrHotel.ApiService.Core.Storage.Entities;

using Microsoft.EntityFrameworkCore;

public class EntityRepository<TContext, TEntity>(
    TContext dbContext)
    : IEntityRepository<TEntity>
    where TContext : DbContext
    where TEntity : class
{
    public DbSet<TEntity> EntitySet { get; } = dbContext.Set<TEntity>();

    public Task SaveChanges()
    {
        return dbContext.SaveChangesAsync();
    }
}
