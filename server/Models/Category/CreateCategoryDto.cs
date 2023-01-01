using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models;

public class CreateCategoryDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
}
