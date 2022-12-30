using WebAPI.Entities;

namespace WebAPI.Models;
public class UserDetailWithEventsDto : UserBaseDto
{
    public IEnumerable<EventsDto> Events { get; set; } = new List<EventsDto>();
}