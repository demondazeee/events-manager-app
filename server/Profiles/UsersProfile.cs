using AutoMapper;
using WebAPI.Entities;
using WebAPI.Models;

public class UsersProfile: Profile
{
    public UsersProfile()
    {
        CreateMap<Users, UserDetailDto>();
        CreateMap<Users, UserDetailWithEventsDto>()
         .ForMember(dest => dest.Events, opt=>opt.MapFrom(src => src.Events.ToList()));

        CreateMap<Users, UserDetailDto>();
        CreateMap<Users, AdminDto>();
        CreateMap<CreateAdminDto, Users>();
        CreateMap<AuthAdminDto, Users>();

        CreateMap<Users, ManagerDto>();
        CreateMap<CreateManagerDto, Users>();
        CreateMap<AuthManagerDto, Users>();
        CreateMap<Users, UpdateVerifyDto>();
        CreateMap<UpdateVerifyDto, Users>();

        CreateMap<Users, MemberDto>();
        CreateMap<CreateMemberDto, Users>();
        CreateMap<AuthMemberDto, Users>();
    }
}