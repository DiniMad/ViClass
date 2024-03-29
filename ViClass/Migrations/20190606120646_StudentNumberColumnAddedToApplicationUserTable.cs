﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace ViClass.Migrations
{
    public partial class StudentNumberColumnAddedToApplicationUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StudentNumber",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentNumber",
                table: "AspNetUsers");
        }
    }
}
