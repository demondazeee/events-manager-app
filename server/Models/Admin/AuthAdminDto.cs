using System.ComponentModel.DataAnnotations;

public class AuthAdminDto
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