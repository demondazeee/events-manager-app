using System.ComponentModel.DataAnnotations;

public class UpdateVerifyDto
{
    [Required]
    public bool isManagerVerified { get; set; }
}