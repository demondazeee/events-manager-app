using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class EventTableUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                column: "Password",
                value: "$argon2id$v=19$m=65536,t=3,p=4$SfUw9VSGtvt/N8FluwuvCHlRyoa44FN40AXVyubNrbKl08gaJNZSi0H5TG7g3GlAsipCUZzSXxjCZ5d3gRnz4sEP2GQrAp+EIPrSx6rDqmRAehfjbxEgB27Z9yI2Y8842NtYN4+I4HN3hLQ2pz68fc/AWBIzqYX9G6g4sEo7gTQ$0NMaXhj3J7Wi2jMW+FUru8IUvl7kolE9N+8jXRHv93E");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                column: "Password",
                value: "$argon2id$v=19$m=65536,t=3,p=4$Gu1oQp6Ig9nxVTAamiXoU12TkCPef3WEIl0L7szkjQLygvCvnQz176drNVeoib4GOtTS5huzIOE0yyOCClseVgrXTQ4CMgd1aWJ4tritJhm16SXbkfMX4cJvQwqRmS96DEC7WsH5id694GCzCK7ZVkugdquDYxgg6VjhdPYF844$iP9T8Z/3ZkBTzqHDd4pGVdqVe8YrKjcNURrCONZaMm0");
        }
    }
}
