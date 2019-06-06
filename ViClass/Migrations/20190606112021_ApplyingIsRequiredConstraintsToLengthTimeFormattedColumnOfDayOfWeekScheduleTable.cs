using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class ApplyingIsRequiredConstraintsToLengthTimeFormattedColumnOfDayOfWeekScheduleTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LengthTimeFormatted",
                table: "DayOfWeekSchedule",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LengthTimeFormatted",
                table: "DayOfWeekSchedule",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
