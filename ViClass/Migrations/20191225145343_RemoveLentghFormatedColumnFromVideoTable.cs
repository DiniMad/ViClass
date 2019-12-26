using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class RemoveLentghFormatedColumnFromVideoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LengthFormatted",
                table: "Video");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LengthFormatted",
                table: "Video",
                maxLength: 6,
                nullable: false,
                defaultValue: "");
        }
    }
}
