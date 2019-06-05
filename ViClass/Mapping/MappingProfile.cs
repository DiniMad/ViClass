using AutoMapper;
using ViClass.Controllers.Resources;
using ViClass.Models;

namespace ViClass.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Class, ClassResource>();
            CreateMap<Video, VideoResource>();
            CreateMap<SharedFile, SharedFileResource>();
            CreateMap<DayOfWeekSchedule, DayOfWeekScheduleResource>();
        }
    }
}