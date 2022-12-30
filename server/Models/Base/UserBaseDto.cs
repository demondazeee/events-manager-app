using System.ComponentModel.DataAnnotations;

public abstract class UserBaseDto
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MinLength(4)]
    [MaxLength(12)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MinLength(4)]
    [MaxLength(12)]
    public string AccessToken { get; set; } = string.Empty;
}