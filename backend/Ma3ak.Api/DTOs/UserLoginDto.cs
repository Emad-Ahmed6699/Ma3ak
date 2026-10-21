using System.ComponentModel.DataAnnotations;

namespace Ma3ak.Api.DTOs.Users;

public class UserLoginDto
{
    [Required(ErrorMessage = "البريد الإلكتروني مطلوب")]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "كلمة المرور مطلوبة")]
    public string Password { get; set; } = string.Empty;
}