using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class DbUsersManagerVerified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsManagerVerified",
                table: "Users",
                type: "boolean",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                columns: new[] { "IsManagerVerified", "Password" },
                values: new object[] { null, "$argon2id$v=19$m=65536,t=3,p=4$YuiQjhRRKM7gY7qEYcU3/RlNEGNUyYNCQMaEF0+E2IhBaKykZdJTFEHHhrXpkL1SMWmBYo2hMiWEVgFUF7pv89ttEuMqxtK3oY3vk+/ClYvEokgxl3RfxvfFbaHmfoVfxRqAuLzbjKfTs61zL4AESKmNiJVGOOgd2wBDU3nHTFs$j+Znba6KBA0LsxQQk4D7uAg2JW4f/h+2nqBvKgnAgO8" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsManagerVerified",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                column: "Password",
                value: "$argon2id$v=19$m=65536,t=3,p=4$lpcXs+I5CB+pxNd56gJ8lyUg6pmgFfulyLRne/SKhmD1Jd+4Y9SWgWyd+rDrI43zDsjVG2Qv9y1iV5AYEtCV7uNuatKaaBDVAognuhx3oOSkzBdt/DeeaNpE7CJfHi9/kVtWBiTa/hpeVtIHETwcZFzr9bcHjAugfgddlj3dTQI$7YwfQ4HDmtAYm7ubbUmJYlMXslCX1bCsP2DCAPuwOIE");
        }
    }
}
