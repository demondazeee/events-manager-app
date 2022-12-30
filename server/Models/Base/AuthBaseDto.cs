using System.ComponentModel.DataAnnotations;

public abstract class AuthBaseDto
{
    [Required]
    [MinLength(4)]
    [MaxLength(12)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MinLength(4)]
    [MaxLength(12)]
    public string Password { get; set; } = string.Empty;
}