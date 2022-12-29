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
    public DateTime CreatedAt { get; set; }

    // public Users? Owner {get; set;}

    public string OwnerName { get; set; } = string.Empty;

}