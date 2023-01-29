using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class DbCreatedAtUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "IsManagerVerified", "Password", "Role", "Username" },
                values: new object[] { new Guid("30c3680b-01d8-4542-ab8f-7f6f79dcd354"), new DateTime(2023, 1, 26, 7, 57, 11, 23, DateTimeKind.Utc).AddTicks(8795), "admin", null, "$argon2id$v=19$m=65536,t=3,p=4$VTUaGRRscezehHQ1XJ4gTUIHSsAi3ZZgU9Y56py4vrcynqktGX3P3TcmKXit7JyI8Eci1ZR8JXxbTp1GmATAXtLUTxNDMQCGiI6ZL7dT9xLuAXJCgUEUn7zXu2AAFF9QawO5FIK8VHr0W3AhnRIbR/22sembTLzMVfP6HRTLLFI$rsXx4Z5dDe+62ea7bQxVbHUkWDRLEvgDa54/P1O97LQ", 0, "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("30c3680b-01d8-4542-ab8f-7f6f79dcd354"));

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IsManagerVerified", "Password", "Role", "Username" },
                values: new object[] { new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"), "admin@admin.com", null, "$argon2id$v=19$m=65536,t=3,p=4$YuiQjhRRKM7gY7qEYcU3/RlNEGNUyYNCQMaEF0+E2IhBaKykZdJTFEHHhrXpkL1SMWmBYo2hMiWEVgFUF7pv89ttEuMqxtK3oY3vk+/ClYvEokgxl3RfxvfFbaHmfoVfxRqAuLzbjKfTs61zL4AESKmNiJVGOOgd2wBDU3nHTFs$j+Znba6KBA0LsxQQk4D7uAg2JW4f/h+2nqBvKgnAgO8", 0, "admin" });
        }
    }
}
