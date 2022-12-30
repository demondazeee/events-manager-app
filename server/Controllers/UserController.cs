using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

    [HttpGet("{userName}")]
    public async Task<ActionResult<UserDetailWithEventsDto>> GetUserByUsername(
        string userName
    ) {
        var username = await userRepo.GetValueByExpression(u => u.Username == userName);

        if(username == null) {
            return NotFound();
        }

        var events = await eventRepo.GetEvents("", username.Id.ToString());
        if(events == null) {
            return NotFound();
        }

        var result = mapper.Map<UserDetailWithEventsDto>(username);
        var mappedEvents = mapper.Map<IEnumerable<EventsDto>>(events);

        result.Events = mappedEvents;

        return Ok(result);
    }

    [HttpPost("admin/login")]
    public async Task<ActionResult<AdminDto>> LoginAdmin(
        AuthAdminDto adminDto
    )
    {
        return await LoginUser<AuthAdminDto, AdminDto>(adminDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("admin/register")]
    public async Task<ActionResult<AdminDto>> CreateAdmin(
        CreateAdminDto adminDto
    ) {
        return await RegisterUser<CreateAdminDto, AdminDto>(adminDto, UserRole.Admin);
    }

    [HttpPost("manager/login")]
    public async Task<ActionResult<ManagerDto>> LoginManager(
        AuthManagerDto authDto
    ) {
        return await LoginUser<AuthManagerDto, ManagerDto>(authDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("register")]
    public async Task<ActionResult<ManagerDto>> CreateManager(
        CreateManagerDto managerDto
    ) 
    {
        return await RegisterUser<CreateManagerDto, ManagerDto>(managerDto, UserRole.Manager);
    }

    [HttpPost("member/login")]
    public async Task<ActionResult<MemberDto>> LoginMember(
        AuthMemberDto memberDto
    )
    {
        return await LoginUser<AuthMemberDto, MemberDto>(memberDto);
    }

    [HttpPost("member/register")]
    public async Task<ActionResult<MemberDto>> CreateMember(
        CreateMemberDto memberDto
    )
    {
        return await RegisterUser<CreateMemberDto, MemberDto>(memberDto, UserRole.Member);
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<UserDetailDto>> RefreshToken()
    {
        return await RefreshUserToken<UserDetailDto>();
    }

    [HttpPost("logout")]
    public ActionResult LogoutMember() {
        return LogoutUser();
    }

}