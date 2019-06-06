using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class StudentNumberValidateColumnNameOfApplicationUserTableChangedToStudentNumberConfirmed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StudentNumberValidate",
                table: "AspNetUsers",
                newName: "StudentNumberConfirmed");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StudentNumberConfirmed",
                table: "AspNetUsers",
                newName: "StudentNumberValidate");
        }
    }
}
