using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services;
using static WebAPI.Entities.Users;

namespace WebAPI.Controllers;

[ApiController]
[Route("/user/admin")]
public class AdminController : AuthBaseController
{
    public AdminController(IMapper mapper, IConfiguration config, IUsersRepository userRepo) : base(mapper, config, userRepo)
    {
    }

    [HttpPost("login")]
    public async Task<ActionResult<AdminDto>> LoginAdmin(
        AuthAdminDto adminDto
    )
    {
        return await LoginUser<AuthAdminDto, AdminDto>(adminDto, UserRole.Admin);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("register")]
    public async Task<ActionResult<AdminDto>> CreateAdmin(
        CreateAdminDto adminDto
    ) {
        return await RegisterUser<CreateAdminDto, AdminDto>(adminDto, UserRole.Admin);
    }
}