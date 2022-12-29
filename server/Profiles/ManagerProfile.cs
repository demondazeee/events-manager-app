using AutoMapper;
using WebAPI.Entities;
using WebAPI.Models;

public class ManagerProfile : Profile
{
    public ManagerProfile()
    {
        CreateMap<Users, ManagerDto>();
        CreateMap<CreateManagerDto, Users>();
        CreateMap<AuthManagerDto, Users>();    
    }
}