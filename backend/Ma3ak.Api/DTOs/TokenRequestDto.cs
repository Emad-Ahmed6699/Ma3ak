using System.ComponentModel.DataAnnotations;

namespace Ma3ak.Api.DTOs.Users;

public class TokenRequestDto
{
    [Required]
    public string Token { get; set; } = string.Empty; // التوكن القديم المنتهي

    [Required]
    public string RefreshToken { get; set; } = string.Empty; // الريفريش توكن
}