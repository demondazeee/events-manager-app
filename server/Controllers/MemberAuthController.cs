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
[Route("/auth")]
public class MemberAuthController : ControllerBase
{
    private readonly IMapper mapper;
    private readonly IConfiguration config;
    private readonly IUsersRepository usersRepo;
    public MemberAuthController(
        IConfiguration config,
        IMapper mapper,
        IUsersRepository usersRepo
    )
    {
        this.config = config;
        this.mapper = mapper;
        this.usersRepo = usersRepo;
    }


    [HttpPost("login")]
    public async Task<ActionResult<MemberDto>> LoginMember(
        AuthMemberDto memberDto
    )
    {
        var user = await usersRepo.GetValueByExpression(u => u.Username == memberDto.Username);


        if(user == null){
            return Unauthorized("Username not found");
        }

        if(user.Role == UserRole.Admin || user.Role == UserRole.Manager) {
            return BadRequest();
        }


        if(!Argon2.Verify(user.Password, memberDto.Password)) {
            return Unauthorized("Invalid Password");
        }

        var mappedUser = mapper.Map<MemberDto>(user);

        var accessToken = usersRepo.GenerateToken(mappedUser.Id, user.Role);
        var refreshToken = usersRepo.GenerateToken(mappedUser.Id, user.Role, true);
        Response.Cookies.Append("rt", refreshToken, new () {
            MaxAge = TimeSpan.FromDays(7),
            HttpOnly = true
        });

        mappedUser.AccessToken = accessToken;

        return Ok(mappedUser);
    }

    [HttpPost("register")]
    public async Task<ActionResult<MemberDto>> CreateMember(
        CreateMemberDto memberDto
    ) {
        var mappedUser = mapper.Map<Users>(memberDto);

        var buffer = RandomNumberGenerator.GetBytes(128);
        var config = new Argon2Config() {
            Salt = buffer,
            Password = Encoding.UTF8.GetBytes(mappedUser.Password)
        };
        mappedUser.Role = UserRole.Member;
        mappedUser.Password = Argon2.Hash(config);

        var accessToken = usersRepo.GenerateToken(mappedUser.Id, UserRole.Member);
        var refreshToken = usersRepo.GenerateToken(mappedUser.Id, UserRole.Member, true);
        Response.Cookies.Append("rt", refreshToken, new () {
            MaxAge = TimeSpan.FromDays(7),
            HttpOnly = true
        });

        await usersRepo.Create(mappedUser);

        var result = mapper.Map<MemberDto>(mappedUser);
        result.AccessToken = accessToken;

        return Ok(result);
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<MemberDto>> RefreshToken()
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
        var user = await usersRepo.GetValueByExpression(u => u.Id == new Guid(userId));

        if(user == null) {
            return NotFound("User not found");
        }
        
        var mappedUser = mapper.Map<MemberDto>(user);

        var accessToken = usersRepo.GenerateToken(mappedUser.Id, user.Role);
        var refreshToken = usersRepo.GenerateToken(mappedUser.Id, user.Role, true);
        Response.Cookies.Append("rt", refreshToken, new () {
            MaxAge = TimeSpan.FromDays(7),
            HttpOnly = true
        });

        mappedUser.AccessToken = accessToken;

        return Ok(mappedUser);
    }


    [HttpPost("logout")]
    public ActionResult LogoutMember() {

        Response.Cookies.Append("rt", "", new () {
            MaxAge = TimeSpan.Zero,
        });

        return Ok(new {
            message = "user logged out"
        });
    }
}