using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class AddNameAndFamilyColumnToApplicationUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NameAndFamily",
                table: "AspNetUsers",
                maxLength: 32,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameAndFamily",
                table: "AspNetUsers");
        }
    }
}
