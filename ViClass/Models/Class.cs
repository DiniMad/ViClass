using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace ViClass.Models
{
    public class Class
    {
        public Class()
        {
            Videos = new Collection<Video>();
            Students = new Collection<ClassStudent>();
            SharedFiles = new Collection<SharedFile>();
            DayOfWeekSchedules = new Collection<DayOfWeekSchedule>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string InstructorId { get; set; }
        public ApplicationUser Instructor { get; set; }
        public ICollection<ClassStudent> Students { get; set; }
        public bool ShouldPresentVideo { get; set; }
        public ICollection<Video> Videos { get; set; }
        public ICollection<SharedFile> SharedFiles { get; set; }
        public ICollection<DayOfWeekSchedule> DayOfWeekSchedules { get; set; }
        public string StartDateFormatted { get; set; }
        public string EndDateFormatted { get; set; }
        public byte PeriodInEveryXWeeks { get; set; }
        public byte MinStudentNumber { get; set; }
        public byte? MaxStudentNumber { get; set; }
        public bool IsItPrivate { get; set; }
        public ushort PriceInToman { get; set; }
        public string LinkToLiveBroadcast { get; set; }
    }
}