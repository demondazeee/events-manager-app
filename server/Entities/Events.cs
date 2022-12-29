using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Entities;

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
    public DateTime CreatedAt { get; set; }

    [ForeignKey("OwnerId")]
    public Users? Owner { get; set; }
    public Guid OwnerId { get; set; }

    

    public Events(
        string title,
        string description
    )
    {
        Title = title;
        Description = description;
    }
}