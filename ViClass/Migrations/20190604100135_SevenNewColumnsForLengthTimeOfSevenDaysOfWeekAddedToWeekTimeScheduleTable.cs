using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class SevenNewColumnsForLengthTimeOfSevenDaysOfWeekAddedToWeekTimeScheduleTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FridayLengthTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MondayLengthTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SaturdayLengthTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SundayLengthTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThursdayLengthTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TuesdayLengthTime",
                table: "WeekTimeSchedule",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WednesdayLengthTime",
                table: "WeekTimeSchedule",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FridayLengthTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "MondayLengthTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "SaturdayLengthTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "SundayLengthTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "ThursdayLengthTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "TuesdayLengthTime",
                table: "WeekTimeSchedule");

            migrationBuilder.DropColumn(
                name: "WednesdayLengthTime",
                table: "WeekTimeSchedule");
        }
    }
}
