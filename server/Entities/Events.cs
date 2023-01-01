using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Entities;

// public enum EventsType
// {
//     Music,
//     Business,
//     PeformanceArts,
//     Others
// }

public class Events
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public string? HeaderImage { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    // Duration of the event
    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    // Event Creation Date
    public DateTime CreatedAt { get; set; }

    [Required]
    public string Location { get; set; }

    [Required]
    public string Category {get; set;}


    [Required]
    public bool IsFree {get; set;}

    public bool IsClosed {get; set;}

    [ForeignKey("OwnerId")]
    public Users? Owner { get; set; }
    public Guid OwnerId { get; set; }
    

    public Events(
        string title,
        string description,
        string location,
        string category
    )
    {
        Title = title;
        Description = description;
        Location = location;
        Category = category;
    }
}