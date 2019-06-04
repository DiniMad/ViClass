using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class MakeMaxStudentNumberColumnOfClassTableNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "MaxStudentNumber",
                table: "Classes",
                nullable: true,
                oldClrType: typeof(byte));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "MaxStudentNumber",
                table: "Classes",
                nullable: false,
                oldClrType: typeof(byte),
                oldNullable: true);
        }
    }
}
