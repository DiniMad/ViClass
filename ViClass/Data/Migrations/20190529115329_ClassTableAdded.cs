using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Data.Migrations
{
    public partial class ClassTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Class",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    InstructorId = table.Column<string>(nullable: true),
                    StartDateFormatted = table.Column<string>(nullable: true),
                    EndDateFormatted = table.Column<string>(nullable: true),
                    PeriodInEveryXWeeks = table.Column<byte>(nullable: false),
                    MinStudentNumber = table.Column<byte>(nullable: false),
                    MaxStudentNumber = table.Column<byte>(nullable: false),
                    IsItPrivate = table.Column<bool>(nullable: false),
                    PriceInToman = table.Column<ushort>(nullable: false),
                    LinkToLiveBroadcast = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Class", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Class_AspNetUsers_InstructorId",
                        column: x => x.InstructorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Class_InstructorId",
                table: "Class",
                column: "InstructorId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Class");
        }
    }
}
