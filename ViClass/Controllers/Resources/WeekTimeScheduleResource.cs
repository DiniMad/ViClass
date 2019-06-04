namespace ViClass.Controllers.Resources
{
    public class WeekTimeScheduleResource
    {
        public int    Id                          { get; set; }
        public string SaturdayStartTimeFormatted  { get; set; }
        public string SaturdayLengthTime          { get; set; }
        public string SundayStartTimeFormatted    { get; set; }
        public string SundayLengthTime            { get; set; }
        public string MondayStartTimeFormatted    { get; set; }
        public string MondayLengthTime            { get; set; }
        public string TuesdayStartTimeFormatted   { get; set; }
        public string TuesdayLengthTime           { get; set; }
        public string WednesdayStartTimeFormatted { get; set; }
        public string WednesdayLengthTime         { get; set; }
        public string ThursdayStartTimeFormatted  { get; set; }
        public string ThursdayLengthTime          { get; set; }
        public string FridayStartTimeFormatted    { get; set; }
        public string FridayLengthTime            { get; set; }
    }
}