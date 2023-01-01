using System.Linq.Expressions;
using WebAPI.DBContext;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Services;

public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
{
    protected readonly Db context;
    public RepositoryBase(
        Db context
    )
    {
        this.context = context;
    }
    public async Task Create(T entity)
    {
        await context.Set<T>().AddAsync(entity);

        await this.SaveChangesAsync();
    }

    public async Task Delete(T entity)
    {
        context.Set<T>().Remove(entity);

        await this.SaveChangesAsync();
    }

    public async Task<T?> GetValueByExpression(Expression<Func<T, bool>> exp)
    {
        return await context.Set<T>().Where(exp).FirstOrDefaultAsync();
    }


    public async Task<IEnumerable<T>> GetValuesByExpression(Expression<Func<T, bool>> exp)
    {
        return await context.Set<T>().Where(exp).ToListAsync();
    }

    public async Task<IEnumerable<T>> GetValues()
    {
        return await context.Set<T>().ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }
}