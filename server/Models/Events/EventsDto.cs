using System.ComponentModel.DataAnnotations;
using WebAPI.Entities;

namespace WebAPI.Models;

public class EventsDto
{
    [Key]
    public Guid Id { get; set; }

    public string? HeaderImage { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

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

    public DateTime CreatedAt { get; set; }

    public string OwnerName { get; set; } = string.Empty;

}