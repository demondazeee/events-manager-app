using AutoMapper;
using WebAPI.Entities;
using WebAPI.Models;

public class EventsProfile : Profile
{
    public EventsProfile()
    {
        CreateMap<EventsDto, Events>();
        CreateMap<CreateEventsDto, Events>();
        CreateMap<Events, EventsDto>()
        .ForMember(dest => dest.OwnerName, opt=>opt.MapFrom(src => src.Owner!.Username));
    }
}