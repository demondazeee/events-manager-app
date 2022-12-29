using AutoMapper;
using WebAPI.Entities;
using WebAPI.Models;

public class MemberProfile : Profile
{
    public MemberProfile()
    {
        CreateMap<Users, MemberDto>();
        CreateMap<CreateMemberDto, Users>();
        CreateMap<AuthMemberDto, Users>();
    }
}