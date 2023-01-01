using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class CategoryAndEventTableUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventsType",
                table: "Events");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Events",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                column: "Password",
                value: "$argon2id$v=19$m=65536,t=3,p=4$jkN6+q4TsYUEBw1cn/cuyRXt4kGpG8NVWvBslj6mfGZFeJmwWcmUbEn86Wisb5oj6ixCx8lO82p6VJsSpVwSTBrxVmMC5BW7C8UHG3ioAiKsptpVGvhvaH/9tGmZudorIi7EFILSV+Bw8dG1arM7NNmvTewCawVSA1myJildUok$VW/R/Hd/xrbLGOX43FVrx1e2FHsbe3GxZ7tRAOJPspI");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Events");

            migrationBuilder.AddColumn<int>(
                name: "EventsType",
                table: "Events",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                column: "Password",
                value: "$argon2id$v=19$m=65536,t=3,p=4$SfUw9VSGtvt/N8FluwuvCHlRyoa44FN40AXVyubNrbKl08gaJNZSi0H5TG7g3GlAsipCUZzSXxjCZ5d3gRnz4sEP2GQrAp+EIPrSx6rDqmRAehfjbxEgB27Z9yI2Y8842NtYN4+I4HN3hLQ2pz68fc/AWBIzqYX9G6g4sEo7gTQ$0NMaXhj3J7Wi2jMW+FUru8IUvl7kolE9N+8jXRHv93E");
        }
    }
}
