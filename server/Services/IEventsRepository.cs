using WebAPI.Entities;

namespace WebAPI.Services;

public interface IEventsRepository: IRepositoryBase<Events>
{
    Task<Events?> GetEvent(Guid eventId);
    Task<IEnumerable<Events>> GetEvents();
}