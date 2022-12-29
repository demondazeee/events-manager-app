using WebAPI.Entities;
using static WebAPI.Entities.Users;

namespace WebAPI.Services;

public interface IUsersRepository: IRepositoryBase<Users>
{
    string? GetAuthUser();
    string GenerateToken(Guid userId, UserRole role, bool isRefreshToken = false);
}