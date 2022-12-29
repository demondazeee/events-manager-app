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
        .ToListAsync();
    }


    public async Task<Events?> GetEvent(Guid eventId) {

        
        return await _context.Events
        .Where(x => x.Id == eventId)
        .Include(x => x.Owner)
        .FirstOrDefaultAsync();
    }
}