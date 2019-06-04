using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class TypeOfSevenColumnOfSevenDaysOfWeekInWeekTimeScheduleChangedToStringAlsoNameFormateChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FridayTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "MondayTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "SaturdayTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "SundayTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "ThursdayTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "TuesdayTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "WednesdayTime",
                table: "WeekTimeSchedule");

            migrationBuilder.AddColumn<string>(
                name: "FridayStartTimeFormatted",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MondayStartTimeFormatted",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SaturdayStartTimeFormatted",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SundayStartTimeFormatted",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThursdayStartTimeFormatted",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TuesdayStartTimeFormatted",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WednesdayStartTimeFormatted",
                table: "WeekTimeSchedule",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FridayStartTimeFormatted",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "MondayStartTimeFormatted",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "SaturdayStartTimeFormatted",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "SundayStartTimeFormatted",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "ThursdayStartTimeFormatted",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "TuesdayStartTimeFormatted",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "WednesdayStartTimeFormatted",
                table: "WeekTimeSchedule");

            migrationBuilder.AddColumn<int>(
                name: "FridayTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MondayTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SaturdayTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SundayTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThursdayTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TuesdayTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WednesdayTime",
                table: "WeekTimeSchedule",
                nullable: true);
        }
    }
}
