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
        var config = new Argon2Config() {
            Salt = buffer,
            Password = Encoding.UTF8.GetBytes("admin")
        };
        modelBuilder.Entity<Users>().HasData(
            new {
                Id = new Guid("5ecc49fa-59c6-4286-ad91-d221c81dad2e"),
                Username = "admin",
                Password = Argon2.Hash(config),
                Email = "admin@admin.com",
                Role = Entities.Users.UserRole.Admin
            }
        );
        base.OnModelCreating(modelBuilder);
    }
}