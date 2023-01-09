using WebAPI.Entities;

namespace WebAPI.Services;

public interface IEventsRepository: IRepositoryBase<Events>
{
    Task<Events?> GetEvent(Guid eventId);
    Task<(IEnumerable<Events>, PaginationMetadata)> GetEvents(
        string? userName, 
        string? userId,
        string? category,
        bool isClosed, 
        int pageNumber, 
        int pageSize
        );
}