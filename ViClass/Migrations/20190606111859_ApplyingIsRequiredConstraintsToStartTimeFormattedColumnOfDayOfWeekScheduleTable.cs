using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class ApplyingIsRequiredConstraintsToStartTimeFormattedColumnOfDayOfWeekScheduleTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StartTimeFormatted",
                table: "DayOfWeekSchedule",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StartTimeFormatted",
                table: "DayOfWeekSchedule",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
