using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class RenameLinkToLiveBroadcastColumnInClassTableToStreamKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LinkToLiveBroadcast",
                table: "Classes",
                newName: "StreamKey");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StreamKey",
                table: "Classes",
                newName: "LinkToLiveBroadcast");
        }
    }
}
