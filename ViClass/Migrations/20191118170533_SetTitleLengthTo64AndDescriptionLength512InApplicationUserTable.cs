using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class SetTitleLengthTo64AndDescriptionLength512InApplicationUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Classes",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Classes",
                maxLength: 512,
                nullable: false,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Classes",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 64);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Classes",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 512);
        }
    }
}
