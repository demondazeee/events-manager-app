using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Entities;
using WebAPI.Models;
using WebAPI.Services;

[ApiController]
[Route("/events")]
public class EventsController : ControllerBase
{

    private readonly IConfiguration config;
    private readonly IMapper mapper;
    private readonly IEventsRepository eventRepo;
    private readonly IUsersRepository userRepo;
    public EventsController(
        IMapper mapper,
        IConfiguration config,
        IEventsRepository eventRepo,
        IUsersRepository userRepo
    )
    {
        this.mapper = mapper;
        this.config = config;
        this.eventRepo = eventRepo;
        this.userRepo = userRepo;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventsDto>>> GetEvents()
    {
        var events = await eventRepo.GetEvents();

        var mapped = mapper.Map<IEnumerable<EventsDto>>(events);
        return Ok(mapped);
    }

    [HttpGet("{eventId}")]
    public async Task<ActionResult<EventsDto>> GetEvents(
        string eventId
    )
    {

        var events = await eventRepo.GetEvent(new Guid(eventId));

        if(events == null)
        {
            return NotFound();
        }

        var result = mapper.Map<EventsDto>(events);
        return Ok(result);
    }

    [Authorize(Roles = "Admin, Manager")]
    [HttpPost]
    public async Task<ActionResult> CreateEvents(
        CreateEventsDto eventsDto
    ) {
        var userId = userRepo.GetAuthUser();

        if(userId == null) {
            return Unauthorized();
        }

        var user = await userRepo.GetValueByExpression(e => e.Id == new Guid(userId));

        if(user == null) {
            return NotFound();
        }

        var mappedEvents = mapper.Map<Events>(eventsDto);

        user.Events.Add(mappedEvents);
        
        await eventRepo.SaveChangesAsync();

        return Ok(mapper.Map<EventsDto>(mappedEvents));
    }
    
}