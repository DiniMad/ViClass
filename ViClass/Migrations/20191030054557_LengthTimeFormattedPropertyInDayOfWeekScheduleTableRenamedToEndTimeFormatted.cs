using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class LengthTimeFormattedPropertyInDayOfWeekScheduleTableRenamedToEndTimeFormatted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LengthTimeFormatted",
                table: "DayOfWeekSchedule",
                newName: "EndTimeFormatted");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EndTimeFormatted",
                table: "DayOfWeekSchedule",
                newName: "LengthTimeFormatted");
        }
    }
}
