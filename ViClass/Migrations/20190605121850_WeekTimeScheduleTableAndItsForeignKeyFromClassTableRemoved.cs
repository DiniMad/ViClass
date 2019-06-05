using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class WeekTimeScheduleTableAndItsForeignKeyFromClassTableRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_WeekTimeSchedule_WeekTimeScheduleId",
                table: "Classes");

            migrationBuilder.DropTable(
                name: "WeekTimeSchedule");

            migrationBuilder.DropIndex(
                name: "IX_Classes_WeekTimeScheduleId",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "WeekTimeScheduleId",
                table: "Classes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WeekTimeScheduleId",
                table: "Classes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "WeekTimeSchedule",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClassId = table.Column<int>(nullable: false),
                    FridayLengthTime = table.Column<string>(maxLength: 5, nullable: true),
                    FridayStartTimeFormatted = table.Column<string>(maxLength: 5, nullable: true),
                    MondayLengthTime = table.Column<string>(maxLength: 5, nullable: true),
                    MondayStartTimeFormatted = table.Column<string>(maxLength: 5, nullable: true),
                    SaturdayLengthTime = table.Column<string>(maxLength: 5, nullable: true),
                    SaturdayStartTimeFormatted = table.Column<string>(maxLength: 5, nullable: true),
                    SundayLengthTime = table.Column<string>(maxLength: 5, nullable: true),
                    SundayStartTimeFormatted = table.Column<string>(maxLength: 5, nullable: true),
                    ThursdayLengthTime = table.Column<string>(maxLength: 5, nullable: true),
                    ThursdayStartTimeFormatted = table.Column<string>(maxLength: 5, nullable: true),
                    TuesdayLengthTime = table.Column<string>(maxLength: 5, nullable: true),
                    TuesdayStartTimeFormatted = table.Column<string>(maxLength: 5, nullable: true),
                    WednesdayLengthTime = table.Column<string>(maxLength: 5, nullable: true),
                    WednesdayStartTimeFormatted = table.Column<string>(maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeekTimeSchedule", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Classes_WeekTimeScheduleId",
                table: "Classes",
                column: "WeekTimeScheduleId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_WeekTimeSchedule_WeekTimeScheduleId",
                table: "Classes",
                column: "WeekTimeScheduleId",
                principalTable: "WeekTimeSchedule",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
