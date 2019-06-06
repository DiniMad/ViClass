using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class PriceInTomanColumnNameOfClassTableChangedToPriceInHezarToman : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceInToman",
                table: "Classes");

            migrationBuilder.AddColumn<int>(
                name: "PriceInHezarToman",
                table: "Classes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceInHezarToman",
                table: "Classes");

            migrationBuilder.AddColumn<int>(
                name: "PriceInToman",
                table: "Classes",
                nullable: false,
                defaultValue: 0);
        }
    }
}
