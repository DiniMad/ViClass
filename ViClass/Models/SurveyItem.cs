namespace ViClass.Models
{
    public class SurveyItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public uint VotedForCount { get; set; }
        public uint VotedAgainstCount { get; set; }
        public int SurveyId { get; set; }
        public Survey Survey { get; set; }
    }
}