using Microsoft.EntityFrameworkCore;
using WebAPI.DBContext;
using WebAPI.Entities;

namespace WebAPI.Services;
public class EventsRepository : RepositoryBase<Events>, IEventsRepository
{
    private readonly Db _context;
    public EventsRepository(Db context) : base(context)
    {
        this._context = context;
    }
    public async Task<IEnumerable<Events>> GetEvents(){
        return await _context.Events
        .Include(x => x.Owner)
        .OrderByDescending(x => x.CreatedAt)
        .ToListAsync();
    }
    
    public async Task<(IEnumerable<Events>, PaginationMetadata)> GetEvents(
        string? userName, 
        string? userId,
        bool isClosed,
        int pageNumber,
        int pageSize
        )
    {

        var collection = _context.Events as IQueryable<Events>;
       if(!string.IsNullOrWhiteSpace(userName)){
            userName = userName.Trim();
            collection = collection.Where(x => x.Owner!.Username == userName)
            .Include(x => x.Owner)
            .OrderByDescending(x => x.CreatedAt);
       }

       if(!string.IsNullOrWhiteSpace(userId)) {
            collection = collection
            .Where(x => x.Owner!.Id == new Guid(userId!))
            .Include(x => x.Owner)
            .OrderByDescending(x => x.CreatedAt);
       }

       var totalItemCount = await collection.CountAsync();

       var pageMetadata = new PaginationMetadata(
        pageNumber,
        pageSize,
        totalItemCount
       );

        var result = await collection
        .Where(e => e.IsClosed == isClosed)
        .Include(x => x.Owner)
        .OrderByDescending(x => x.CreatedAt)
        .Skip(pageSize * (pageNumber - 1))
        .Take(pageSize)
        .ToListAsync();

        return (result, pageMetadata);
    }

    public async Task<Events?> GetEvent(Guid eventId) {
        
        return await _context.Events
        .Where(x => x.Id == eventId)
        .Include(x => x.Owner)
        .FirstOrDefaultAsync();
    }


}