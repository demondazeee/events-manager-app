using WebAPI.DBContext;
using WebAPI.Entities;

namespace WebAPI.Services;

public class CategoryRepository: RepositoryBase<Category>, ICategoryRepository
{
    private readonly Db _context;
    public CategoryRepository(Db _context): base(_context)
    {
        this._context = _context;
    }
}