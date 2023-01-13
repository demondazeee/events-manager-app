
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Isopoh.Cryptography.Argon2;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Entities;
using WebAPI.Models;
using WebAPI.Services;
using static WebAPI.Entities.Users;

namespace WebAPI.Controllers;

public abstract class AuthBaseController : ControllerBase
{
    protected readonly IMapper mapper;
    protected readonly IConfiguration config;

    protected readonly IUsersRepository userRepo;
     
    public AuthBaseController(
        IMapper mapper,
        IConfiguration config,
        IUsersRepository userRepo
    )
    {
        this.mapper = mapper;
        this.config = config;
        this.userRepo = userRepo;
    }

    protected async Task<ActionResult<U>> LoginUser<T, U>(
        T authDto,
        UserRole role
    ) where T: AuthBaseDto
    where U: UserBaseDto
    {
        var user = await userRepo.GetValueByExpression(u => u.Username == authDto.Username);

        if(user == null){
            return Unauthorized(new {
                Message = "Invalid Username"
            });
        }


        if(!Argon2.Verify(user.Password, authDto.Password)) {
            return Unauthorized(new {
                Message = "Invalid Password"
            });
        }



        if(user.Role != role) {
            return Unauthorized(new {
                Message = "Invalid Log In"
            });
        }

        var mappedUser = mapper.Map<U>(user);
        
        var accessToken = userRepo.GenerateToken(mappedUser.Id, user.Role);
        var refreshToken = userRepo.GenerateToken(mappedUser.Id, user.Role, true);
        Response.Cookies.Append("rt", refreshToken, new () {
            MaxAge = TimeSpan.FromDays(7),
            HttpOnly = true
        });

        mappedUser.AccessToken = accessToken;

        return Ok(mappedUser);
    }

    protected async Task<ActionResult<U>> RegisterUser<T, U>(
        T adminDto,
        UserRole role
    )
    where T: CreateUserBaseDto
    where U: UserBaseDto
    
    
     {
        var mappedUser = mapper.Map<Users>(adminDto);

        var buffer = RandomNumberGenerator.GetBytes(128);
        var config = new Argon2Config() {
            Salt = buffer,
            Password = Encoding.UTF8.GetBytes(mappedUser.Password)
        };
        mappedUser.Role = role;
        mappedUser.Password = Argon2.Hash(config);
    

        await userRepo.Create(mappedUser);

        var result = mapper.Map<U>(mappedUser);

        var accessToken = userRepo.GenerateToken(result.Id, role);
        var refreshToken = userRepo.GenerateToken(result.Id, role, true);
        Response.Cookies.Append("rt", refreshToken, new () {
            MaxAge = TimeSpan.FromDays(7),
            HttpOnly = true
        });
        result.AccessToken = accessToken;

        return Ok(result);
    }

    protected async Task<ActionResult<T>> RefreshUserToken<T>()
    where T: UserBaseDto
    {
        try{
            var oldToken = Request.Cookies["rt"];

            if(oldToken == null){
                return Unauthorized(new {
                Message = "No token found"
            });
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
                return Unauthorized(new {
                Message = "Invalid Token"
            });
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
                return NotFound(new {
                Message = "User not found"
            });
            }
            
            var mappedUser = mapper.Map<T>(user);

            var accessToken = userRepo.GenerateToken(mappedUser.Id, user.Role);
            var refreshToken = userRepo.GenerateToken(mappedUser.Id, user.Role, true);
            Response.Cookies.Append("rt", refreshToken, new () {
                MaxAge = TimeSpan.FromDays(7),
                HttpOnly = true
            });

            mappedUser.AccessToken = accessToken;

            return Ok(mappedUser);
        } catch(Exception e){
            return Unauthorized(e.Message);
        }
    }

    protected ActionResult LogoutUser() {

        Response.Cookies.Append("rt", "", new () {
            MaxAge = TimeSpan.Zero,
        });

        return Ok(new {
            message = "User Logged out"
        });
    }
}