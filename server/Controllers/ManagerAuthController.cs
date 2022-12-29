using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Isopoh.Cryptography.Argon2;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Entities;
using WebAPI.Models;
using WebAPI.Services;
using static WebAPI.Entities.Users;

[ApiController]
[Route("/manager")]
public class ManagerAuthController : ControllerBase
{
    private readonly IMapper mapper;
    private readonly IConfiguration config;
    private readonly IUsersRepository userRepo;
    public ManagerAuthController(
        IMapper mapper,
        IConfiguration config,
        IUsersRepository userRepo
    )
    {
        this.mapper = mapper;
        this.config = config;
        this.userRepo = userRepo;
    }

    [HttpPost("login")]
    public async Task<ActionResult<ManagerDto>> LoginManager(
        AuthManagerDto authDto
    )
    {
         var user = await userRepo.GetValueByExpression(u => u.Username == authDto.Username);

        if(user == null){
            return Unauthorized("Invalid Username");
        }

        if(!Argon2.Verify(user.Password, authDto.Password)) {
            return Unauthorized("Invalid Password");
        }

        var mappedUser = mapper.Map<ManagerDto>(user);

        var accessToken = userRepo.GenerateToken(mappedUser.Id, user.Role);
        var refreshToken = userRepo.GenerateToken(mappedUser.Id, user.Role, true);
        Response.Cookies.Append("rt", refreshToken, new () {
            MaxAge = TimeSpan.FromDays(7),
            HttpOnly = true
        });

        mappedUser.AccessToken = accessToken;

        return Ok(mappedUser);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("register")]
    public async Task<ActionResult<ManagerDto>> CreateManager(
        CreateManagerDto managerDto
    ) {
        var mappedUser = mapper.Map<Users>(managerDto);

        var buffer = RandomNumberGenerator.GetBytes(128);
        var config = new Argon2Config() {
            Salt = buffer,
            Password = Encoding.UTF8.GetBytes(mappedUser.Password)
        };
        mappedUser.Role = UserRole.Manager;
        mappedUser.Password = Argon2.Hash(config);

        var accessToken = userRepo.GenerateToken(mappedUser.Id, UserRole.Manager);
        var refreshToken = userRepo.GenerateToken(mappedUser.Id, UserRole.Manager, true);
        Response.Cookies.Append("rt", refreshToken, new () {
            MaxAge = TimeSpan.FromDays(7),
            HttpOnly = true
        });

        await userRepo.Create(mappedUser);

        var result = mapper.Map<ManagerDto>(mappedUser);
        result.AccessToken = accessToken;

        return Ok(result);
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<ManagerDto>> RefreshToken()
    {
        var oldToken = Request.Cookies["rt"];

        if(oldToken == null){
            return Unauthorized("No token");
        }
        var decoded = new JwtSecurityTokenHandler().ValidateToken(
            oldToken,
            new TokenValidationParameters() {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = config["Authentication:Issuer"],
                ValidAudience = config["Authentication:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(config["Authentication:SecretForKey"]!)
            )
            },
            out SecurityToken validatedToken
        );
        if (validatedToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        {
            return Unauthorized("invalid");
        }

        if(decoded.Identity == null ){
            return Unauthorized();
        }

        var userId = decoded.Identity.Name;

        if(userId == null){
            return Unauthorized();
        }
        var user = await userRepo.GetValueByExpression(u => u.Id == new Guid(userId));

        if(user == null) {
            return NotFound("User not found");
        }
        
        var mappedUser = mapper.Map<ManagerDto>(user);

        var accessToken = userRepo.GenerateToken(mappedUser.Id, user.Role);
        var refreshToken = userRepo.GenerateToken(mappedUser.Id, user.Role, true);
        Response.Cookies.Append("rt", refreshToken, new () {
            MaxAge = TimeSpan.FromDays(7),
            HttpOnly = true
        });

        mappedUser.AccessToken = accessToken;

        return Ok(mappedUser);
    }
}