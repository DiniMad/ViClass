using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class ChangeVolumeInMgColumnTypeToStringInSharedFileTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "VolumeInMg",
                table: "SharedFile",
                nullable: true,
                oldClrType: typeof(double));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "VolumeInMg",
                table: "SharedFile",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
