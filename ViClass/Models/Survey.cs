using System.Collections.Generic;

namespace ViClass.Models
{
    public class Survey
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public ApplicationUser Creator { get; set; }
        public ICollection<SurveyItem> SurveyItems { get; set; }
    }
}