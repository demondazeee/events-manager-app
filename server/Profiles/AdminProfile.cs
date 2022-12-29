using AutoMapper;
using WebAPI.Entities;

public class AdminProfile : Profile
{
    public AdminProfile()
    {
        CreateMap<Users, AdminDto>();
        CreateMap<CreateAdminDto, Users>();
        CreateMap<AuthAdminDto, Users>();
    }
}