using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class ChangeTypeOfVolumInMgColumnInVideoTableToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "VolumeInMg",
                table: "Video",
                nullable: true,
                oldClrType: typeof(long));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "VolumeInMg",
                table: "Video",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
