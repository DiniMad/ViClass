using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Data.Migrations
{
    public partial class SharedFilesColumnAddedToClassTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SharedFile",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true),
                    VolumeInMg = table.Column<ushort>(nullable: false),
                    ClassId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SharedFile", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SharedFile_Class_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Class",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SharedFile_ClassId",
                table: "SharedFile",
                column: "ClassId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SharedFile");
        }
    }
}
