namespace Ma3ak.Api.DTOs.Users;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public UserReturnDto User { get; set; } = null!;
}