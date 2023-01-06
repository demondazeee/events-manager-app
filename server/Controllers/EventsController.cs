using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Entities;
using WebAPI.Models;
using WebAPI.Services;
using System.Text.Json;
using Microsoft.AspNetCore.JsonPatch;

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
    public async Task<ActionResult<IEnumerable<EventsDto>>> GetEvents(
        string? name,
        string? userId,
        int pageSize=10,
        int pageNumber=1

    )
    {
        var (result, pageMetadata) = await eventRepo.GetEvents(name, userId, pageNumber, pageSize);

        var mapped = mapper.Map<IEnumerable<EventsDto>>(result);
        Response.Headers.Add("X-Pagination",  JsonSerializer.Serialize(pageMetadata));
        return Ok(mapped);
    }

    [HttpGet("{eventId}")]
    public async Task<ActionResult<IEnumerable<EventsDto>>> GetEvents(
        string eventId
    )
    {
        var events = await eventRepo.GetEvent(new Guid(eventId));

        if(events == null) {
            return NotFound();
        }

        var mapped = mapper.Map<EventsDto>(events);
        return Ok(mapped);
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
    
    [Authorize(Roles = "Admin, Manager")]
    [HttpPatch("{eventId}")]
    public async Task<ActionResult<EventsDto>> UpdateEvent(
        string eventId,
        JsonPatchDocument<UpdateEventsDto> eventDto
    ) {
        var user = userRepo.GetAuthUser();

        if(user == null){
            return Unauthorized();
        }

        var events = await eventRepo.GetValueByExpression(e => e.Id == new Guid(eventId) && e.OwnerId == new Guid(user));

        if(events == null){
            return NotFound();
        }
        
        var mappedEvents = mapper.Map<UpdateEventsDto>(events);

        eventDto.ApplyTo(mappedEvents, ModelState);

        if(!ModelState.IsValid){
            return BadRequest(ModelState);
        }

        if(!TryValidateModel(mappedEvents)){
            return BadRequest(ModelState);
        }

        var updatedEvents = mapper.Map(mappedEvents, events);

        await eventRepo.SaveChangesAsync();



        return Ok(mapper.Map<EventsDto>(updatedEvents));
    }
}