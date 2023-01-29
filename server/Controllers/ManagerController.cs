using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services;
using static WebAPI.Entities.Users;

namespace WebAPI.Controllers;

[ApiController]
[Route("/user/manager")]
public class ManagerController: AuthBaseController
{
    public ManagerController(IMapper mapper, IConfiguration config, IUsersRepository userRepo) : base(mapper, config, userRepo)
    {
    }

    [HttpPost("manager/login")]
    public async Task<ActionResult<ManagerDto>> LoginManager(
        AuthManagerDto authDto
    ) {
        return await LoginUser<AuthManagerDto, ManagerDto>(authDto, UserRole.Manager);
    }

    [HttpPost("manager/register")]
    public async Task<ActionResult<ManagerDto>> CreateManager(
        CreateManagerDto managerDto
    ) 
    {
        return await RegisterUser<CreateManagerDto, ManagerDto>(managerDto, UserRole.Manager);
    }

    [Authorize(Roles = "Admin")]
    [HttpPatch("manager/verify/{userId}")]
    public async Task<ActionResult<ManagerDto>> UpdateVerified (
        string userId,
        JsonPatchDocument<UpdateVerifyDto> userDto
    ) 
    {
        var user = await userRepo.GetValueByExpression(v => v.Id == new Guid(userId));

        if(user == null){
            return NotFound(new {
                errorMessage = "User Not found"
            });
        }

        if(user.IsManagerVerified == true){
            return BadRequest(new {
                errorMessage = $"{user.Username} is already verified."
            });
        }

        var managerToPatch = mapper.Map<UpdateVerifyDto>(user);

        userDto.ApplyTo(managerToPatch, ModelState);

        if(!TryValidateModel(managerToPatch)){
            return BadRequest(ModelState);
        }

        if(!ModelState.IsValid){
            return BadRequest(ModelState);
        }

        var result = mapper.Map(managerToPatch, user);

        await userRepo.SaveChangesAsync();
        
        return Ok(mapper.Map<ManagerDto>(result));
    }
}   