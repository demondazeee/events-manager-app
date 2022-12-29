using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebAPI.DBContext;
using WebAPI.Entities;
using static WebAPI.Entities.Users;

namespace WebAPI.Services;

public class UsersRepository : RepositoryBase<Users>, IUsersRepository
{
    private IConfiguration config;
    private IHttpContextAccessor http;
    public UsersRepository(
        Db context,
        IConfiguration config,
        IHttpContextAccessor http
    ) : base(context)
    {
        this.http = http;
        this.config = config;
    }
    public string? GetAuthUser() {
         var result = string.Empty;
         if (http.HttpContext != null)
            {
                result = http.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            }

        return result;
    }
    
    public string GenerateToken(Guid userId, UserRole role, bool isRefreshToken = false)
    {
        var securityKey = new SymmetricSecurityKey(
            Encoding.ASCII.GetBytes(config["Authentication:SecretForKey"]!)
        );

        var signingCredentials = new SigningCredentials(
            securityKey, SecurityAlgorithms.HmacSha256
        );

        var claims = new List<Claim>();
        claims.Add(new Claim(ClaimTypes.Name, userId.ToString()));
        claims.Add(new Claim(ClaimTypes.Role, role.ToString()));

        var tokenToWrite = new JwtSecurityToken(
            config["Authentication:Issuer"],
            config["Authentication:Audience"],
            claims,
            DateTime.UtcNow,
            isRefreshToken ?  DateTime.UtcNow.AddDays(7) : DateTime.UtcNow.AddMinutes(15),
            signingCredentials
        );

        var jwtToken = new JwtSecurityTokenHandler().WriteToken(tokenToWrite);

        return jwtToken;
    }
}