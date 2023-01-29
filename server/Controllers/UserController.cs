using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services;
using static WebAPI.Entities.Users;

namespace WebAPI.Controllers;

[ApiController]
[Route("/user")]
public class UserController : AuthBaseController
{
    private readonly IEventsRepository eventRepo;
    public UserController(
        IConfiguration config,
        IMapper mapper,
        IUsersRepository userRepo,
        IEventsRepository eventRepo
    ) : base(mapper, config, userRepo)
    {
        this.eventRepo = eventRepo;
    }



    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDetailDto>>> GetAdminUsers(
        UserRole? role
    ) {
        var result = new List<UserDetailDto>();
        if(role == UserRole.Admin) {
            var users = await userRepo.GetUsersByRole(UserRole.Admin);
            result = mapper.Map<List<UserDetailDto>>(users);
        }

        if(role == UserRole.Manager) {
            var users = await userRepo.GetUsersByRole(UserRole.Manager);
            result = mapper.Map<List<UserDetailDto>>(users);
        }

        return Ok(result);
    }

    [HttpGet("{userName}")]
    public async Task<ActionResult<UserDetailWithEventsDto>> GetUserByUsername(
        string userName,
        bool IsClosed = false,
        int eventPageNumber = 1,
        int eventPageSize=10
    ) {
        var username = await userRepo.GetValueByExpression(u => u.Username == userName);

        if(username == null) {
            return NotFound();
        }
        
        var (events, pageMetadata) = await eventRepo.GetEvents(userName, "", "", IsClosed, eventPageNumber, eventPageSize);


        var result = mapper.Map<UserDetailDto>(username);
        var mappedEvents = mapper.Map<IEnumerable<EventsDto>>(events);

        
        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pageMetadata));
        
        if(result.Role == UserRole.Member) {
             return Ok(new {
            user = result,
            events = new List<object[]>()
        });
        }

        return Ok(new {
            user = result,
            events = mappedEvents
        });
    }



    [HttpPost("member/login")]
    public async Task<ActionResult<MemberDto>> LoginMember(
        AuthMemberDto memberDto
    )
    {
        return await LoginUser<AuthMemberDto, MemberDto>(memberDto, UserRole.Member);
    }

    [HttpPost("member/register")]
    public async Task<ActionResult<MemberDto>> CreateMember(
        CreateMemberDto memberDto
    )
    {
        return await RegisterUser<CreateMemberDto, MemberDto>(memberDto, UserRole.Member);
    }

    [HttpGet("refresh")]
    public async Task<ActionResult<UserDetailDto>> RefreshToken()
    {
        return await RefreshUserToken<UserDetailDto>();
    }

    [HttpPost("logout")]
    public ActionResult LogoutMember() {
        return LogoutUser();
    }

}