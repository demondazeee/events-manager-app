using System.ComponentModel.DataAnnotations;

public class CreateEventsDto
{
    
    public string? HeaderImage { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}