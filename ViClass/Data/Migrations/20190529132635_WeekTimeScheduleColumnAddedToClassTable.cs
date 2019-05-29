using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Data.Migrations
{
    public partial class WeekTimeScheduleColumnAddedToClassTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WeekTimeScheduleId",
                table: "Class",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "WeekTimeSchedule",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SaturdayTime = table.Column<ushort>(nullable: true),
                    SundayTime = table.Column<ushort>(nullable: true),
                    MondayTime = table.Column<ushort>(nullable: true),
                    TuesdayTime = table.Column<ushort>(nullable: true),
                    WednesdayTime = table.Column<ushort>(nullable: true),
                    ThursdayTime = table.Column<ushort>(nullable: true),
                    FridayTime = table.Column<ushort>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeekTimeSchedule", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Class_WeekTimeScheduleId",
                table: "Class",
                column: "WeekTimeScheduleId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Class_WeekTimeSchedule_WeekTimeScheduleId",
                table: "Class",
                column: "WeekTimeScheduleId",
                principalTable: "WeekTimeSchedule",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Class_WeekTimeSchedule_WeekTimeScheduleId",
                table: "Class");

            migrationBuilder.DropTable(
                name: "WeekTimeSchedule");

            migrationBuilder.DropIndex(
                name: "IX_Class_WeekTimeScheduleId",
                table: "Class");

            migrationBuilder.DropColumn(
                name: "WeekTimeScheduleId",
                table: "Class");
        }
    }
}
