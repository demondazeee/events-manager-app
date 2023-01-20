﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WebAPI.DBContext;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(Db))]
    partial class DbModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("WebAPI.Entities.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = new Guid("deee9a3d-b385-4c98-b452-897003a0b497"),
                            Name = "Music"
                        },
                        new
                        {
                            Id = new Guid("8e3eb515-b114-4a3f-98e6-ce37bbb1386e"),
                            Name = "Visual Arts and Performance"
                        },
                        new
                        {
                            Id = new Guid("52e56a6b-52bc-4f91-bac4-2406f87cc94d"),
                            Name = "Business"
                        });
                });

            modelBuilder.Entity("WebAPI.Entities.Events", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("FromDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("HeaderImage")
                        .HasColumnType("text");

                    b.Property<bool>("IsClosed")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsFree")
                        .HasColumnType("boolean");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("OwnerId")
                        .HasColumnType("uuid");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ToDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("WebAPI.Entities.Users", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool?>("IsManagerVerified")
                        .HasColumnType("boolean");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                            Email = "admin@admin.com",
                            Password = "$argon2id$v=19$m=65536,t=3,p=4$YuiQjhRRKM7gY7qEYcU3/RlNEGNUyYNCQMaEF0+E2IhBaKykZdJTFEHHhrXpkL1SMWmBYo2hMiWEVgFUF7pv89ttEuMqxtK3oY3vk+/ClYvEokgxl3RfxvfFbaHmfoVfxRqAuLzbjKfTs61zL4AESKmNiJVGOOgd2wBDU3nHTFs$j+Znba6KBA0LsxQQk4D7uAg2JW4f/h+2nqBvKgnAgO8",
                            Role = 0,
                            Username = "admin"
                        });
                });

            modelBuilder.Entity("WebAPI.Entities.Events", b =>
                {
                    b.HasOne("WebAPI.Entities.Users", "Owner")
                        .WithMany("Events")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("WebAPI.Entities.Users", b =>
                {
                    b.Navigation("Events");
                });
#pragma warning restore 612, 618
        }
    }
}
