using System.Linq.Expressions;

namespace WebAPI.Services;

public interface IRepositoryBase<T>
{
    Task Create(T entity);

    Task Delete(T entity);

    Task<IEnumerable<T>> GetValues();

    Task<T?> GetValueByExpression(Expression<Func<T, bool>> exp);

    Task SaveChangesAsync();
}