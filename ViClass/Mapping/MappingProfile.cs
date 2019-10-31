﻿using System.Linq;
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
            CreateMap<Class, SingleClassResource>()
                .ForMember(cs => cs.Students, opt => opt.MapFrom(c => c.Students.Select(cs => cs.Student)));
        }
    }
}