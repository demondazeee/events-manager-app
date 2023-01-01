using System.ComponentModel.DataAnnotations;
using WebAPI.Entities;

public class CreateEventsDto
{
    
    public string? HeaderImage { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    // Duration of the event
    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    [Required]
    public string Location { get; set; } = string.Empty;

    [Required]
    public string Category {get; set; } = string.Empty;
    
    [Required]
    public bool IsFree {get; set;}

    public bool IsClosed {get; set;}


    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}