namespace MrHotel.ApiService.Core.Storage.Entities.Extensions;

using Microsoft.EntityFrameworkCore;

public static class EntityRepositoryServiceCollectionExtensions
{
    public static void AddEntityRepository<TContext, TEntity>(
        this IServiceCollection services)
        where TContext : DbContext
        where TEntity : class
    {
        ArgumentNullException.ThrowIfNull(services);

        services.AddTransient<IEntityRepository<TEntity>, EntityRepository<TContext, TEntity>>();
    }
}
