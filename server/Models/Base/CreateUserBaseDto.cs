using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models;

public abstract class CreateUserBaseDto
{
    [Required]
    [MinLength(4)]
    [MaxLength(12)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MinLength(4)]
    [MaxLength(12)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}