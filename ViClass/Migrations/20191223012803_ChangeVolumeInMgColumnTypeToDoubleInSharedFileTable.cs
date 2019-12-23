using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class ChangeVolumeInMgColumnTypeToDoubleInSharedFileTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "VolumeInMg",
                table: "SharedFile",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "VolumeInMg",
                table: "SharedFile",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
