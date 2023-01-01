using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class CategoryDataInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("52e56a6b-52bc-4f91-bac4-2406f87cc94d"), "Business" },
                    { new Guid("8e3eb515-b114-4a3f-98e6-ce37bbb1386e"), "Visual Arts and Performance" },
                    { new Guid("deee9a3d-b385-4c98-b452-897003a0b497"), "Music" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                column: "Password",
                value: "$argon2id$v=19$m=65536,t=3,p=4$lpcXs+I5CB+pxNd56gJ8lyUg6pmgFfulyLRne/SKhmD1Jd+4Y9SWgWyd+rDrI43zDsjVG2Qv9y1iV5AYEtCV7uNuatKaaBDVAognuhx3oOSkzBdt/DeeaNpE7CJfHi9/kVtWBiTa/hpeVtIHETwcZFzr9bcHjAugfgddlj3dTQI$7YwfQ4HDmtAYm7ubbUmJYlMXslCX1bCsP2DCAPuwOIE");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("52e56a6b-52bc-4f91-bac4-2406f87cc94d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("8e3eb515-b114-4a3f-98e6-ce37bbb1386e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("deee9a3d-b385-4c98-b452-897003a0b497"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                column: "Password",
                value: "$argon2id$v=19$m=65536,t=3,p=4$jkN6+q4TsYUEBw1cn/cuyRXt4kGpG8NVWvBslj6mfGZFeJmwWcmUbEn86Wisb5oj6ixCx8lO82p6VJsSpVwSTBrxVmMC5BW7C8UHG3ioAiKsptpVGvhvaH/9tGmZudorIi7EFILSV+Bw8dG1arM7NNmvTewCawVSA1myJildUok$VW/R/Hd/xrbLGOX43FVrx1e2FHsbe3GxZ7tRAOJPspI");
        }
    }
}
