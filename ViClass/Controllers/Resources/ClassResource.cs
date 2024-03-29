using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using ViClass.Models;

namespace ViClass.Controllers.Resources
{
    public class ClassResource
    {
        public int                                    Id                  { get; set; }
        public string                                 Title               { get; set; }
        public string                                 Description         { get; set; }
        public string                                 InstructorId        { get; set; }
        public ApplicationUserResource                Instructor          { get; set; }
        public ICollection<ApplicationUserResource>   Students            { get; set; }
        public bool                                   ShouldPresentVideo  { get; set; }
        public ICollection<VideoResource>             Videos              { get; set; }
        public ICollection<SharedFileResource>        SharedFiles         { get; set; }
        public ICollection<DayOfWeekScheduleResource> DayOfWeekSchedules  { get; set; }
        public string                                 StartDateFormatted  { get; set; }
        public string                                 EndDateFormatted    { get; set; }
        public byte                                   PeriodInEveryXWeeks { get; set; }
        public byte                                   MinStudentNumber    { get; set; }
        public byte?                                  MaxStudentNumber    { get; set; }
        public bool                                   IsItPrivate         { get; set; }
        public ushort                                 PriceInHezarToman   { get; set; }
        public string                                 StreamKey           { get; set; }
    }
}