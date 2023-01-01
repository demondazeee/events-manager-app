using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models;

public class CategoryDto
{
    [Key]
    public Guid Id { get; set; }


    [Required]
    public string Name { get; set; } = string.Empty;
}