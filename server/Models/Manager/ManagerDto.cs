using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models;

public class ManagerDto : UserBaseDto
{
    public bool IsManagerVerified { get; set; }
}