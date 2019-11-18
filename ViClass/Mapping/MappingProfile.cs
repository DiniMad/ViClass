using System.Linq;
using AutoMapper;
using ViClass.Controllers.Resources;
using ViClass.Models;

namespace ViClass.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ApplicationUser, ApplicationUserResource>();
            CreateMap<Class, ClassResource>()
                .ForMember(cs => cs.Students, opt => opt.MapFrom(c => c.Students.Select(cs => cs.Student)));
            CreateMap<Video, VideoResource>();
            CreateMap<SharedFile, SharedFileResource>();
            CreateMap<DayOfWeekSchedule, DayOfWeekScheduleResource>();
            CreateMap<Class, ClassWithRelationResource>()
                .ForMember(cs => cs.Students, opt => opt.MapFrom(c => c.Students.Select(cs => cs.Student)));

            CreateMap<ClassResource, Class>();
            CreateMap<DayOfWeekScheduleResource, DayOfWeekSchedule>();
        }
    }
}