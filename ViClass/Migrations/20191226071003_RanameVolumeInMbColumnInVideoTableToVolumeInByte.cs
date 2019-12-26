using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class RanameVolumeInMbColumnInVideoTableToVolumeInByte : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VolumeInMg",
                table: "Video",
                newName: "VolumeInByte");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VolumeInByte",
                table: "Video",
                newName: "VolumeInMg");
        }
    }
}
