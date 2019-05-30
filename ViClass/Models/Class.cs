using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace ViClass.Models
{
    public class Class
    {
        public Class()
        {
            Students=new Collection<ClassStudent>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string InstructorId { get; set; }
        public ApplicationUser Instructor { get; set; }
        public ICollection<ClassStudent> Students { get; set; }
        public bool ShouldPresentVideo
        {
            get => ShouldPresentVideo;
            set => Videos = value ? new Collection<Video>() : null;
        }
        public ICollection<Video> Videos { get; set; }
        public string StartDateFormatted { get; set; }
        public string EndDateFormatted { get; set; }
        public byte PeriodInEveryXWeeks { get; set; }
        public byte MinStudentNumber { get; set; }
        public byte MaxStudentNumber { get; set; }
        public bool IsItPrivate { get; set; }
        public ushort PriceInToman { get; set; }
        public string LinkToLiveBroadcast { get; set; }
    }
}