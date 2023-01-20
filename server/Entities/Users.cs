using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebAPI.Entities;



public class Users
{
    public enum UserRole {
        Admin,
        Manager,
        Member
    }
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    public bool? IsManagerVerified { get; set; }

    [Required]
    public UserRole Role { get; set; }

    public ICollection<Events> Events { get; set; } = new List<Events>();

    public Users(
        string username,
        string password,
        string email
    )
    {
        Username = username;
        Password = password;
        Email = email;
    }
}