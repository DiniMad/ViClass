using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class RenamePathColumnInVideoTableToName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Path",
                table: "Video",
                newName: "SavedName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SavedName",
                table: "Video",
                newName: "Path");
        }
    }
}
