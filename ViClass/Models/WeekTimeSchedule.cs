namespace ViClass.Models
{
    public class WeekTimeSchedule
    {
        public int Id { get; set; }
        public ushort? SaturdayTime { get; set; }
        public ushort? SundayTime { get; set; }
        public ushort? MondayTime { get; set; }
        public ushort? TuesdayTime { get; set; }
        public ushort? WednesdayTime { get; set; }
        public ushort? ThursdayTime { get; set; }
        public ushort? FridayTime { get; set; }
        public int ClassId { get; set; }
        public Class Class { get; set; }
    }
}