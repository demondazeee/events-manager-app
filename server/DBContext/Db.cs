using System.Security.Cryptography;
using System.Text;
using Isopoh.Cryptography.Argon2;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.DBContext;

public class Db : DbContext
{
    public DbSet<Users> Users => Set<Users>();
    public DbSet<Events> Events => Set<Events>();

    public DbSet<Category> Categories => Set<Category>();

    private readonly IConfiguration config; 
    public Db(
        DbContextOptions opt,
        IConfiguration config
    ) : base(opt)
    {
        this.config = config;    
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(config["ConnectionStrings:DB"]);
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        var buffer = RandomNumberGenerator.GetBytes(128);
        var argonConfig = new Argon2Config() {
            Salt = buffer,
            Password = Encoding.UTF8.GetBytes(config["Seed:Admin_Password"]!)
        };
        modelBuilder.Entity<Users>().HasData(
            new {
                Id = new Guid(config["Seed:Admin_Id"]!),
                Username = config["Seed:Admin_Username"],
                Password = Argon2.Hash(argonConfig),
                Email = config["Seed:Admin_Password"],
                CreatedAt = DateTime.UtcNow,
                Role = Entities.Users.UserRole.Admin
            }
        );

        modelBuilder.Entity<Category>().HasData(
            new {
                Id = new Guid("deee9a3d-b385-4c98-b452-897003a0b497"),
                Name = "Music",
            },
            new {
                Id = new Guid("8e3eb515-b114-4a3f-98e6-ce37bbb1386e"),
                Name = "Visual Arts and Performance",
            },
            new {
                Id = new Guid("52e56a6b-52bc-4f91-bac4-2406f87cc94d"),
                Name = "Business",
            }
        );
        base.OnModelCreating(modelBuilder);
    }
}